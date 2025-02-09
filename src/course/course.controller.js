'use strict';

import User from '../user/user.model.js';
import Course from './course.model.js';

// Controlador para guardar algun curso nuevo

export const saveCourse = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'Profesor no encontrado' 
            });
        }

        const course = new Course({
            ...data,
            teacher: user._id,
        });

        await course.save();

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al guardar el curso',
            error
        });
    }
}


// Controlador para enlistar los cursos que tengo

export const getCourses = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const courses = await Course.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        const coursesWithOwnerNames = await Promise.all(courses.map(async (course) => {
            const owner = await User.findById(course.teacher);
            return {
                ...course.toObject(),
                keeper: owner ? owner.nombre : "Profesor encontrado",
            };
        }));

        const total = await Course.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            curses: coursesWithOwnerNames,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los cursos',
            error
        });
    }
}


// Controlador para buscar algun curso por su id

export const searchCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Curso no encontrado' 
            });
        }

        const owner = await User.findById(course.teacher);

        res.status(200).json({
            success: true,
            course: {
                ...course.toObject(),
                teacher: owner ? owner.nombre : "Profesor no encontrado",
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar el curso',
            error
        });
    }
};


// Controlador para eliminar algun cursa por su ID

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        await Course.findByIdAndUpdate(id, { status: false });

        res.status(200).json({ 
            success: true,
            message: 'Curso eliminado exitosamente' 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar curso',
            error
        });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { uid } = req.params;
        const  data  = req.body;

        const course = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Curso Actualizado',
            course,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar curso',
            error: err.message
        });
    }
}

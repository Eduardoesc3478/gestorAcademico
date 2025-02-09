import { Router } from "express";
import { saveCourse, getCourses, searchCourse, updateCourse, deleteCourse } from "./course.controller.js";
import { createCourseValidator, getCourseByIdValidator, updateCourseValidator, deleteCourseValidator } from "../middlewares/course-validators.js";

const router = Router();
// Agregar curso
router.post("/addCourse", createCourseValidator, saveCourse);
// Buscar curso
router.get("/findCourse/:id", getCourseByIdValidator, searchCourse);
// Enlistar cursos
router.get("/", getCourses);
// actualizar curso
router.put("/updateCourse/:id", updateCourseValidator, updateCourse);
// Eliminar curso
router.delete("/deleteCourse/:id", deleteCourseValidator, deleteCourse);

export default router;
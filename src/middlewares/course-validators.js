import { body, param } from "express-validator";
import { courseExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createCourseValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    handleErrors
];

export const getCourseByIdValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(courseExists),
    validarCampos,
    handleErrors
];

export const updateCourseValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(courseExists),
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("description").optional().notEmpty().withMessage("La descripción es requerida"),
    validarCampos,
    handleErrors
];

export const deleteCourseValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(courseExists),
    validarCampos,
    handleErrors
];

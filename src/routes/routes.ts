import { Router } from "express";

import { createPerson } from "../controller/PersonContrroller";
import { readPersons } from "../controller/PersonContrroller";
import { updatePerson } from "../controller/PersonContrroller";
import { deleteUser } from "../controller/PersonContrroller";

import { authenticate } from "../middleware/authMiddleware";
import { login, logout } from "../controller/AuthController";

const router = Router();

// login
router.post('/login', login)

// logout
router.post('/logout', authenticate, logout);

// Home
router.get('/', authenticate, readPersons);

// Create
router.post('/person', authenticate, createPerson);

// Update
router.patch('/person/:id', authenticate, updatePerson);

// Delete
router.delete('/person/:id', authenticate, deleteUser);

export default router;
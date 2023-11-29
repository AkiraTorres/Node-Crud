import asyncHandler from "express-async-handler";

import { findAll, findById, findByEmail, create, update, destroy } from "../services/UserService.js";

export const listAllUsers = asyncHandler(async (req, res, next) => {
    const result = await findAll();
    res.status(200).json(result);
});

export const getUserById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await findById(id);
        if (!result) {
            res.status(404).json({ message: `User with id ${id} not found` });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const getUserByEmail = asyncHandler(async (req, res, next) => {
    const email = req.params.email;
    try {
        const result = await findByEmail(email);
        if (!result) {
            res.status(404).json({ message: `User with email ${email} not found` });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const createUser = asyncHandler(async (req, res, next) => {
    const user = req.body;
    try {
        create(user);
    } catch (error) {
        if (error.name === 'Email already exists') {
            res.status(409).send('A user with this email already exists');
        }
        res.status(500).json({ message: error.message });
    }
    res.status(201).json({ message: "User created" });
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user = req.body;
    try {
        const result = await findById(id);
        if (!result) {
            res.status(404).json({ message: `User with id ${id} not found` });
            return;
        }
        if (!user.firstName) user.firstName = result.firstName; 
        if (!user.lastName) user.lastName = result.lastName; 
        if (!user.email) user.email = result.email; 
        await update(id, user);
        res.status(200).json({ message: `User with id ${id} updated` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export const destroyUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await findById(id);
        console.log(result);
        if (!result) {
            res.status(404).json({ message: `User with id ${id} not found` });
        }

        await destroy(id);
        res.status(200).json({message: `User with id ${id} and name ${result.firstName + " " + result.lastName} deleted`});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
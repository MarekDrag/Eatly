import { router } from "express";
import { getGoals, setGoal, updateGoal, deleteGoal } from "../controllers/goalController";

router.get('/', getGoals);

router.post('/', setGoal);

router.put('/:id', updateGoal);

router.delete('/:id', deleteGoal);



export default router;
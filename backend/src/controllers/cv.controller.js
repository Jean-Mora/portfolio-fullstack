import CV from "../models/CV.js";

/* GET /api/cv */
export const getCV = async (req, res, next) => {
  try {
    const cv = await CV.findOne();
    if (!cv) return res.status(404).json({ message: "CV no encontrado" });
    res.json(cv);
  } catch (err) {
    next(err);
  }
};

/* POST /api/cv */
export const createCV = async (req, res, next) => {
  try {
    const cv = await CV.create(req.body);
    res.status(201).json(cv);
  } catch (err) {
    next(err);
  }
};

/* PUT /api/cv */
export const updateCV = async (req, res, next) => {
  try {
    const cv = await CV.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(cv);
  } catch (err) {
    next(err);
  }
};

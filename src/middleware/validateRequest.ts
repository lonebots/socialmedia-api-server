import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../logger";
import { Schema } from "mongoose";

// we need a schema for validating

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      log.info("userpayload validated");
      return next();
    } catch (e: any) {
      log.error(e);
      // send a  bad request error : code 400
      res.status(400).send(e.errors);
    }
  };

export default validate;

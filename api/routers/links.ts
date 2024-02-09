import {Router} from "express";
import Link from "../models/Link";
import mongoose, {Types} from "mongoose";
import {LinkObject} from "../types";

const linksRouter = Router();

linksRouter.get('/:shortUrl', async (req, res, next) => {
    try {
        const result = await Link.findOne({shortUrl:req.params.shortUrl});
        if(!result){
            res.status(404);
        } else {
            res.status(301).redirect(result.originalUrl);
        }

    } catch (e) {
        return next(e);
    }
});

linksRouter.post('/links', async (req, res, next) => {
    function generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomString = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomString;
    }
  try {
    const linkData: LinkObject = {
      shortUrl: generateRandomString(6),
      originalUrl: req.body.originalUrl,
    };

    const link = new Link(linkData);
    await link.save();

    res.send(link);
  } catch (e) {
    next(e);
  }
});

export default linksRouter;
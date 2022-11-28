import { client } from "../config/redis";


export const redisCheck = async ( req,res, next) => {
    const data = await client.get('getalldata');

    if (data != null) {
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message:'All notes fetched sucessfully from redis'
        });
    } else {
        next();
    }
}
import { response } from "express";
import { AppConfig } from "../commons/environment/appconfig";
import { apiResponse, apiError } from "../commons/http-helpers/api-response";
import {
 getRecord, updateRecord,
} from "../commons/utils/dbMgmt";

export const updateById = async (record) => {
   
};
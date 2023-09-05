
import { apiResponse } from "../commons/http-helpers/api-response";
import { v4 as uuidv4 } from "uuid";

export const addTodo = async (record) => {
    let recordObj = JSON.parse(record["body"]);
    recordObj.todoId = uuidv4();
    recordObj.todoName = "test1";


    return apiResponse(recordObj);

};

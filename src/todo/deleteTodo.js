import { AppConfig } from "../commons/environment/appconfig";
import { apiResponse, apiError } from "../commons/http-helpers/api-response";
import {
    deleteRecord,
 getRecord, updateRecord,
} from "../commons/utils/dbMgmt";
export const  deleteById = async (record) => {
let recordObj={};
recordObj.todoId=record.pathParameters.id;
let params = {
    TableName: AppConfig.DBT_TODO_INFO,
    KeyConditionExpression: 'todoId = :todoId',
  //   FilterExpression: "expiryDate = :expiryDate",
    ExpressionAttributeValues: {
      ':todoId':  recordObj.todoId,
      // ':expiryDate':expiryDate()
    }

  };
let getResponse = await getRecord(params);
console.log(getResponse,'todoResponse');
let requiredFileds = ["todoId"];
const pkFieldNm = "todoId";
const skFieldNm = "creationDate";
let keyObj = {
    todoId: recordObj.todoId,
    creationDate: getResponse.body.Items[0].creationDate,
};
console.log(keyObj,'keys');
recordObj.deleted=true;
let updateResponse = await updateRecord(
    recordObj,
    requiredFileds,
    pkFieldNm,
    skFieldNm,
    AppConfig.DBT_TODO_INFO,
    keyObj
);

if (updateResponse != null && updateResponse.statusCode == "200") {
    let response=await getRecord(params);
    return apiResponse(response);
} else {
    return apiError(500, updateResponse);
}
};
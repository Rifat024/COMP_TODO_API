import { AppConfig } from "../commons/environment/appconfig";
import { apiResponse, apiError } from "../commons/http-helpers/api-response";
import {
    getAllRecord,
 getRecord,
} from "../commons/utils/dbMgmt";
import { currentDateTime, expiryDate } from '../commons/constants';
export const getById = async (record) => {
    let recordObj={};
    let required=["todoId"];

    recordObj.todoId=record.pathParameters.id; 
     console.log(recordObj);
    //         const params = {
    //           TableName: AppConfig.DBT_TODO_INFO,
    //         //   Key: {
    //         //       todoId:recordObj.todoId
    //         //   }
    //           KeyConditionExpression: "todoId = :todoId",
    //           ExpressionAttributeValues: {
    //             ":todoId": recordObj.todoId,
    //           },
    // };

    let requiredFields = ["todoId"];
    let params = {
      TableName: AppConfig.DBT_TODO_INFO,
      KeyConditionExpression: 'todoId = :todoId',
    //   FilterExpression: "expiryDate = :expiryDate",
      ExpressionAttributeValues: {
        ':todoId':  recordObj.todoId,
        // ':expiryDate':expiryDate()
      }
  
    };
    let response = await getRecord(params);

    if (response != null && response.statusCode == "200") {
        return apiResponse(response);
    } else {
        return apiError(500, response);
    };

};

export const getAll = async () => {
    // let recordObj = {};
    // let required = [""];
  
    // // let params = {
    // //     TableName: AppConfig.DBT_TODO_INFO,
    // //     // filterExpression:"creationDate>=:creationDate",
    // //     //       ExpressionAttributeValues: {
    // //     //         ":creationDate": expiryDate(),
    // //     //       },
    // // };
    // let params = {
    //     TableName: AppConfig.DBT_TODO_INFO,
    //     KeyConditionExpression: 'creationDate = :creationDate',
    //    FilterExpression: "creationDate = :creationDate",
    //     ExpressionAttributeValues: {
    //       ':creationDate':  expiryDate(),
    //     //   ':expiryDate':expiryDate()
    //     }
    
    //   };

    // let response = getRecord(params);
    // if (response != null && response.statusCode == "200") {
    //     return apiResponse(response);
    // } else {
    //     return apiError(500, response);
    // };
    const params = {
        TableName: AppConfig.DBT_TODO_INFO,
    };

    const scanResults = [];
   
    // do{
        const items =  await getAllRecord(params);
    //     items.Items.forEach((item)=>scanResults.push(item));
         console.log(items.body.Items,Object.keys(items),'items');
         scanResults.push(...items.body.Items);
        //  scanResults=items.body.Items;
    //    // items.Items.forEach((item) => scanResults.push(item));
    //     params.ExclusiveStartKey  = items.LastEvaluatedKey;
    // }while(typeof items.LastEvaluatedKey !== "undefined");
    
    return apiResponse(scanResults);

};
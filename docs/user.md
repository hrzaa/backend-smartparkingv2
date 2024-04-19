# User API Spec

## Register User API
- Endpoint : POST /api/users
- Request Body : 
    ```json
    {
        "username"  : "hareza",
        "password"  : "antariksa",
        "name"      : "Hareza Yoan Kristianto"
    }
    ```

    Response Body Success :
    ``` json
    {
        "data" : {
            "username" : "hareza",
            "name" : "Hareza Yoan Kristianto"
        }
    }
    ```

    Response Body Error : 
    ```json
    {
        "errors" : "Username already registered"
    }
    ```

## Login User API
- Endpoint : POST /api/users/login
- Request Body : 
    ```json
    {
        "username"  : "hareza",
        "password"  : "antariksa",
    }
    ```

    Response Body Success :
    ``` json
    {
        "data" : {
           "token" : "unique-token"
        }
    }
    ```
    Response Body Error :
    ``` json
    {
        "errors" : "Username or password Wrong!"
    }
    ```

## Update User API
- Endpoint : PATCH /api/users/current
- Headers : 
   - Authorization : token

- Request Body : 
    ```json
    {
        "name"  : "Hareza Yoan Kristianto", //optional
        "password"  : "antariksa", //new password
    }
    ```

    Response Body Success :
    ``` json
    {
        "data" : {
            "username" : "hareza",
            "name" : "Hareza Yoan Kristianto"
        }
    }
    ```

    Response Body Error : 
    ```json
    {
        "errors" : "Name length max 100"
    }
    ```

## Get User API
- Endpoint : GET /api/users/current
- Headers : 
   - Authorization : token
  
    Response Body Success :
    ``` json
    {
        "data" : {
            "username" : "hareza",
            "name" : "Hareza Yoan Kristianto"
        }
    }
    ```

     Response Body Error : 
    ```json
    {
        "errors" : "Unauthorized"
    }
    ```

## Logout User API
- Endpoint : DELETE /api/users/logout
- Headers : 
   - Authorization : token
    Response Body Success : 
    ``` json
        {
            "data" : "OK"
        }
    ```

    Response Body Error : 
    ```json
        {
            "errors" : "Unauthorized"
        }
    ```


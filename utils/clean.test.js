import { cleanUser, cleanUsersList } from "./clean";

test('cleanUser : suppression des données sensibles', () => {
    let userUnCleaned= {
        "userId": 1,
        "firstName": "Super",
        "lastName": "Admin",
        "email": "super.admin@renttogether.com",
        "password": "#I@mF@mous",
        "phoneNumber": "0102030405",
        "isOwner": 0,
        "isRoomer": 0,
        "isAdmin": 1,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:08.190109"
    };

    let userCleaned = {
        "userId": 1,
        "firstName": "Super",
        "lastName": "Admin",
        "email": "super.admin@renttogether.com",
        //no password
        "phoneNumber": "0102030405",
        "isOwner": 0,
        "isRoomer": 0,
        "isAdmin": 1,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:08.190109"
    }

    expect(
        cleanUser(userUnCleaned)
    ).toEqual(userCleaned);
});

test("cleanUserList : suppression des données sensibles d'une liste d'utilisateur", () => {
    let usersUnCleaned =  [{
        "userId": 1,
        "firstName": "Super",
        "lastName": "Admin",
        "email": "super.admin@renttogether.com",
        "password": "#I@mF@mous",
        "phoneNumber": "0102030405",
        "isOwner": 0,
        "isRoomer": 0,
        "isAdmin": 1,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:08.190109"
    },
    {
        "userId": 2,
        "firstName": "Mega",
        "lastName": "Owner",
        "email": "mega.owner@renttogether.com",
        "password": "Coucou",
        "phoneNumber": "0987654345678",
        "isOwner": 1,
        "isRoomer": 0,
        "isAdmin": 0,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "yet_another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:09.190109"
    }];

    let usersCleaned =  [{
        "userId": 1,
        "firstName": "Super",
        "lastName": "Admin",
        "email": "super.admin@renttogether.com",
        //"password": "#I@mF@mous",
        "phoneNumber": "0102030405",
        "isOwner": 0,
        "isRoomer": 0,
        "isAdmin": 1,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:08.190109"
    },
    {
        "userId": 2,
        "firstName": "Mega",
        "lastName": "Owner",
        "email": "mega.owner@renttogether.com",
        //"password": "Coucou",
        "phoneNumber": "0987654345678",
        "isOwner": 1,
        "isRoomer": 0,
        "isAdmin": 0,
        "createDate": "2018-04-01T11:22:08.1901804",
        "token": "yet_another_token_in_the_world",
        "tokenExpirationDate": "2018-04-01T11:22:09.190109"
    }];


    expect(
        cleanUsersList(usersUnCleaned)
    ).toEqual(usersCleaned);
});
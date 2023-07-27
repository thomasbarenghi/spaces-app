const rooms = [
    {
        "id": "room-1",
        "fromSpace": "1",
        "name": "Frontend",
        "description": "Vamos a organizar las tareas de frontend de la manera mas eficiente posible",
        "coverImage": "https://images.unsplash.com/photo-1618339279706-df3b511d7742?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        "lastModified": "2018-01-01T00:00:00.000Z",
        "createdAt": "2018-01-01T00:00:00.000Z",
        "tasks": [
          {
            "id": "123456789",
            "title": "Type something",
            "description": "When you enter into any new area of science, you almost always find.",
            "status": "1",
            "createdAt": "2018-01-01T00:00:00.000Z",
            "lastModified": "2018-01-01T00:00:00.000Z",
            "deadline": "2018-01-01T00:00:00.000Z",
            "assignedTo": [
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              },
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              }
            ],
            "comments": [
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              },
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              }
            ],
            "tags": [
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              },
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              }
            ]
          },
          {
            "id": "123456789",
            "title": "Type something",
            "description": "When you enter into any new area of science, you almost always find.",
            "status": "2",
            "createdAt": "2018-01-01T00:00:00.000Z",
            "lastModified": "2018-01-01T00:00:00.000Z",
            "deadline": "2018-01-01T00:00:00.000Z",
            "assignedTo": [
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              },
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              }
            ],
            "comments": [
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              },
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              }
            ],
            "tags": [
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              },
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              }
            ]
          },
          {
            "id": "123456789",
            "title": "Type something",
            "description": "When you enter into any new area of science, you almost always find.",
            "status": "3",
            "createdAt": "2018-01-01T00:00:00.000Z",
            "lastModified": "2018-01-01T00:00:00.000Z",
            "deadline": "2018-01-01T00:00:00.000Z",
            "assignedTo": [
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              },
              {
                "id": "123456789",
                "profileImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                "firstName": "Jonh",
                "lastName": "Smith"
              }
            ],
            "comments": [
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              },
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              }
            ],
            "tags": [
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              },
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              }
            ]
          }
        ]
      },
      {
        "id": "room-2",
        "fromSpace": "1",
        "name": "thomas-espacio2",
        "description": "Room 2 description",
        "coverImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        "lastModified": "2018-01-01T00:00:00.000Z",
        "createdAt": "2018-01-01T00:00:00.000Z",
        "tasks": [
          {
            "id": "123456789",
            "title": "Task 1",
            "description": "Task 1 description",
            "status": "1",
            "createdAt": "2018-01-01T00:00:00.000Z",
            "lastModified": "2018-01-01T00:00:00.000Z",
            "deadline": "2018-01-01T00:00:00.000Z",
            "assignedTo": [
              {
                "id": "123456789",
                "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                "firstName": "Jonh",
                "lastName": "Smith"
              },
              {
                "id": "123456789",
                "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                "firstName": "Jonh",
                "lastName": "Smith"
              }
            ],
            "comments": [
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              },
              {
                "id": "123456789",
                "content": "Comment 1",
                "createdAt": "2018-01-01T00:00:00.000Z",
                "createdBy": {
                  "id": "123456789",
                  "profileImage": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "firstName": "Jonh",
                  "lastName": "Smith"
                }
              }
            ],
            "tags": [
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              },
              {
                "id": "123456789",
                "name": "Tag 1",
                "color": "#000000"
              }
            ]
          }
        ]
      }
  ];

  

module.exports = rooms;

  
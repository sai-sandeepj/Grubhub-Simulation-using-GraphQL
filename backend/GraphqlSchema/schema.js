const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLBoolean } = require("graphql");
const bcrypt = require('bcrypt-nodejs');
const Users = require('../Models/users')
// const Model = require('../mongoConnection')
const Restaurants = require('../Models/restaurants')
const Items = require('../Models/items')

const ProfileType = new GraphQLObjectType({
    name: 'profile',
    fields: () => ({
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        userPassword: {
            type: GraphQLString
        },
        userEmail: {
            type: GraphQLString
        },
        userPhone: {
            type: GraphQLString
        },
        userAddress: {
            type: GraphQLString
        },
        userZip: {
            type: GraphQLString
        },
        userImage: {
            type: GraphQLString
        },
        accountType: {
            type: GraphQLInt
        },
        restaurant: {
            type: RestaurantType
        }
    })
})

const RestaurantType = new GraphQLObjectType({
    name: 'RestaurantType',
    fields: () => ({
        restName: {
            type: GraphQLString
        },
        restAddress: {
            type: GraphQLString
        },
        restZip: {
            type: GraphQLString
        },
        restPhone: {
            type: GraphQLString
        },
        restDesc: {
            type: GraphQLString
        },
        restImage: {
            type: GraphQLString
        },
        items: {
            type: new GraphQLList(ItemType)
        }
    })
})

const ItemType = new GraphQLObjectType({
    name: 'ItemType',
    fields: () => ({
        itemName: {
            type: GraphQLString
        },
        itemType: {
            type: GraphQLString
        },
        itemPrice: {
            type: GraphQLInt
        },
        itemImage: {
            type: GraphQLString
        },
        itemDesc: {
            type: GraphQLString
        },
        cuisineName: {
            type: GraphQLString
        }
    })
})


//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: ProfileType,
            args: {
                userEmail: {
                    type: GraphQLString
                },
                userPassword: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('args: ', args);
                // var isAuthenticated = false;
                return new Promise(function (resolve, reject) {
                    Users.findOne({
                        "userEmail": args.userEmail
                    }, (err, user) => {
                        if (err) {
                            // isAuthenticated = false;
                            console.log('result in error', user);
                            reject("error")
                        }
                        else {
                            if (!bcrypt.compareSync(args.Password, user.userPassword)) {
                                console.log('result', user);
                                resolve(user)
                            }
                            else {
                                reject("Invalid credentials")
                            }
                        }
                    });
                })
            }
        },
        profile: {
            type: ProfileType,
            args: {
                userEmail: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log('args: ', args);
                // var isAuthenticated = false;
                return new Promise(function (resolve, reject) {
                    Users.findOne({
                        "userEmail": args.userEmail
                    }, (err, user) => {
                        if (err) {
                            // isAuthenticated = false;
                            console.log('result in error', user);
                            reject("error")
                        }
                        else {
                            console.log('result', user);
                            resolve(user)
                        }
                    });
                })
            }
        },
        sections: {
            type: new GraphQLList(GraphQLString),
            args: {
                userEmail: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("args", args);
                return new Promise(function (resolve, reject) {
                    console.log("Inside allsections");
                    return Users
                        .findOne({ userEmail: args.userEmail })
                        .select('-restaurant.items.itemType')
                        .then((result) => {
                            if (!result) {
                                console.log("couldn't get section details");
                                reject("couldn't get section details");
                            } else {
                                console.log("result" + result);
                                console.log("result1" + result.restaurant._id);
                                return Users
                                    .findOne({ "restaurant._id": result.restaurant._id })
                                    .select()
                                    .then((result) => {
                                        console.log(result);
                                        if (!result) {
                                            console.log("couldn't get section details");
                                            reject("couldn't get section details");
                                        } else {
                                            console.log("section reterived");
                                            console.log("result" + result.restaurant.items);
                                            //return res.end(JSON.stringify(result.restaurant.items));
                                            var sectionlength = (result.restaurant.items).length;
                                            console.log("sectionlength", sectionlength);
                                            var sections = [];

                                            result.restaurant.items.forEach(async (section) => {
                                                sections.push(section.itemType);
                                            });

                                            console.log("sections", sections);
                                            resolve(sections)
                                            // resolve(JSON.stringify(Array.from(new Set(sections))));
                                        }
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log("couldnt get profile details", err);
                            reject("couldnt get profile details" + err);
                        });
                })
            }
        },
        items: {
            type: new GraphQLList(ItemType),
            args: {
                userEmail: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("args", args);
                return new Promise(function (resolve, reject) {
                    console.log("Inside allItems");
                    return Users
                        .findOne({ userEmail: args.userEmail })
                        .select()
                        .then((result) => {
                            if (!result) {
                                console.log("couldn't get item details");
                                reject("couldn't get item details");
                            } else {
                                console.log("result" + result);
                                console.log("result1" + result.restaurant._id);
                                return Users
                                    .findOne({ "restaurant._id": result.restaurant._id })
                                    .select()
                                    .then((result) => {
                                        console.log(result);
                                        if (!result) {
                                            console.log("couldn't get item details");
                                            reject("couldn't get item details");
                                        } else {
                                            console.log("items reterived");
                                            console.log("result" + result.restaurant.items);
                                            resolve(result.restaurant.items)
                                        }
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log("couldnt get profile details");
                            reject("couldnt get profile details" + err);
                        });
                })
            }
        },
        itemsbysections: {
            type: new GraphQLList(ItemType),
            args: {
                userEmail: {
                    type: GraphQLString
                },
                itemType: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("args", args);
                return new Promise(function (resolve, reject) {
                    console.log("Inside itemsbasedonsections");
                    return Users
                        .findOne({ userEmail: args.userEmail })
                        .select()
                        .then((result) => {
                            if (!result) {
                                console.log("couldn't get itemsbasedonsections");
                                reject("couldn't get itemsbasedonsections");
                            } else {
                                console.log("result" + result);
                                console.log("result rest id " + result.restaurant._id);
                                return Users
                                    .find({ "restaurant._id": result.restaurant._id, "restaurant.items": { $elemMatch: { itemType: args.itemType } } })
                                    .select('restaurant.items')
                                    .then((result1) => {
                                        console.log("result", result1);
                                        if (!result1) {
                                            console.log("couldn't get itemsbasedonsections");
                                            reject("couldn't get itemsbasedonsections");
                                        } else {
                                            console.log("itemsbasedonsections retreived");
                                            console.log("result1" + result1);
                                            resolve(result1)
                                        }
                                    }).catch(err => {
                                        console.log(err);
                                        reject("" + err);
                                    });
                            }
                        })
                        .catch((err) => {
                            console.log("couldnt get itemsbasedonsections details", err);
                            reject("couldnt get itemsbasedonsections details" + err);
                        });
                })
            }
        },
        search: {
            type: new GraphQLList(ProfileType),
            args: {
                itemName: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("In restaurantsbyItemName");
                return new Promise(function (resolve, reject) {
                    var val = args.itemName;
                    return Users
                        .find({
                            'restaurant.items': { $elemMatch: { itemName: new RegExp(val, 'i') } }
                        })
                        .select(['restaurant', '-_id'])
                        .then((result) => {
                            console.log("result", result);
                            resolve(result)
                        })
                        .catch((err) => {
                            console.log("error in getting restaurants by itemname", err);
                            reject("error in getting restaurants by itemname", err);
                        });
                })
            }
        },
        restaurantitems: {
            type: ProfileType,
            args: {
                restName: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("In itemsByRestaurant", args.restName);
                return new Promise(function (resolve, reject) {
                    console.log("In itemsByRestaurant");

                    return Users
                        .find({
                            'restaurant.items': { $elemMatch: { restName: args.restName } }
                        })
                        .select(['restaurant', '-_id'])
                        .then((result) => {
                            console.log("result", result[0].restaurant);
                            resolve(result[0])
                        })
                        .catch((err) => {
                            console.log("error in getting restaurants");
                            reject("error in getting restaurants");
                        });
                })
            }
        },
        restaurantbyitemcuisine: {
            type: new GraphQLList(ProfileType),
            args: {
                itemName: {
                    type: GraphQLString
                },
                cuisineName: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("inside itemsbasedoncuisines", args)
                return new Promise(function (resolve, reject) {

                    var itemNm = args.itemName;
                    var cuisineNm = args.cuisineName;

                    return Users
                        .find({
                            'restaurant.items': {
                                $elemMatch: {
                                    itemName: new RegExp(itemNm, 'i'),
                                    cuisineName: new RegExp(cuisineNm, 'i')
                                }
                            }
                        })
                        .select(['restaurant', '-_id'])
                        .then((result) => {
                            console.log("result", result);
                            resolve(result)
                        })
                        .catch((err) => {
                            console.log("error in getting restaurants");
                            reject("error in getting restaurants");
                        });
                })
            }
        }
    }
});

const signupResult = new GraphQLObjectType({
    name: 'signupResult',
    fields: () => ({
        success: { type: GraphQLBoolean },
        duplicateUser: { type: GraphQLBoolean }
    })
});

const updateProfileResult = new GraphQLObjectType({
    name: 'updateProfileResult',
    fields: () => ({
        success: { type: GraphQLBoolean }
    })
});


const Mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        customersignup: {
            type: signupResult,
            args: {
                userEmail: {
                    type: GraphQLString
                },
                userPassword: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                userPhone: {
                    type: GraphQLString
                },
                userAddress: {
                    type: GraphQLString
                },
                userZip: {
                    type: GraphQLString
                },
                userImage: {
                    type: GraphQLString
                },
                accountType: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                console.log('args: ', args);
                // var isAuthenticated = false;
                console.log("In customer signup");
                return new Promise(function (resolve, reject) {
                    if (args.accountType != 1) {
                        console.log("enter accountype as 1");
                        reject("error")
                    } else {
                        //Hashing Password
                        const hashedPassword = bcrypt.hashSync(args.userPassword, 10);
                        var new_user = new Users({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            userEmail: args.userEmail,
                            userPassword: hashedPassword,
                            userPhone: args.userPhone,
                            userAddress: args.userAddress,
                            userZip: args.userZip,
                            accountType: args.accountType
                        });

                        new_user.save(function (err) {
                            if (err) {
                                console.log(err)
                                result = {
                                    success: false,
                                    duplicateUser: true
                                }
                                reject(result)
                            }
                            else {
                                console.log("User saved successfully", new_user);
                                result = {
                                    success: true,
                                    duplicateUser: false
                                }
                                resolve(result)
                            }
                        });
                    }
                })
            }
        },
        ownersignup: {
            type: signupResult,
            args: {
                userEmail: {
                    type: GraphQLString
                },
                userPassword: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                userPhone: {
                    type: GraphQLString
                },
                accountType: {
                    type: GraphQLInt
                },
                restName: {
                    type: GraphQLString
                },
                restAddress: {
                    type: GraphQLString
                },
                restZip: {
                    type: GraphQLString
                },
                restPhone: {
                    type: GraphQLString
                },
                // restImage: {
                //     type: GraphQLString
                // },
                restDesc: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("In owner signup");
                return new Promise(function (resolve, reject) {
                    if (args.accountType != 2) {
                        console.log("enter accountype as 2");
                        reject("error")
                    } else {
                        //Hashing Password
                        const hashedPassword = bcrypt.hashSync(args.userPassword, 10);
                        var new_user = new Users({
                            firstName: args.firstName,
                            lastName: args.lastName,
                            userEmail: args.userEmail,
                            userPassword: hashedPassword,
                            userPhone: args.userPhone,
                            accountType: args.accountType
                        });

                        new_user
                            .save()
                            .then((doc) => {
                                console.log("getting userId");

                                var new_userId = Users
                                    .findOne({ userEmail: args.userEmail })
                                    .select('_id')
                                    .then(async (new_user_id) => {
                                        if (!new_user_id) {
                                            console.log("UserId not created");
                                            reject("error")
                                        } else {
                                            console.log("found new userId");
                                            console.log("adding to restaurants");

                                            var new_restaurant = new Restaurants({
                                                "userId": new_user_id._id,
                                                "restName": args.restName,
                                                "restAddress": args.restAddress,
                                                "restZip": args.restZip,
                                                "restPhone": args.restPhone,
                                                // "restImage": args.restImage,
                                                "restDesc": args.restDesc
                                            });

                                            var doc = await Users.findOne({ _id: new_user_id._id }).exec();
                                            doc.restaurant = new_restaurant;
                                            try {
                                                await doc.save();
                                                console.log("Signup Successful")
                                                result = {
                                                    success: true,
                                                    duplicateUser: false
                                                }
                                                resolve(result)
                                            } catch (err) {
                                                console.log("Signup unsuccessful", err);
                                                reject("error")
                                            }
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        reject(err)
                                    });
                            })
                            .catch((err) => {
                                if (err.errmsg.indexOf("duplicate key error") > 1) {
                                    console.log("Try with other email Id", err);
                                    reject(err)
                                } else {
                                    console.log("Unable to save user details", err);
                                    reject(err)
                                }
                            });
                    }
                })
            }
        },
        updateProfile: {
            type: updateProfileResult,
            args: {
                userEmail: {
                    type: GraphQLString
                },
                userPassword: {
                    type: GraphQLString
                },
                firstName: {
                    type: GraphQLString
                },
                lastName: {
                    type: GraphQLString
                },
                userPhone: {
                    type: GraphQLString
                },
                userImage: {
                    type: GraphQLString
                },
                userAddress: {
                    type: GraphQLString
                },
                userZip: {
                    type: GraphQLString
                },
                accountType: {
                    type: GraphQLInt
                },
                restName: {
                    type: GraphQLString
                },
                restAddress: {
                    type: GraphQLString
                },
                restZip: {
                    type: GraphQLString
                },
                restPhone: {
                    type: GraphQLString
                },
                // restImage: {
                //     type: GraphQLString
                // },
                restDesc: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("In updateprofile");
                console.log('args: ', args);
                return new Promise(function (resolve, reject) {
                    return Users
                        .findOne({ userEmail: args.userEmail })
                        .select('accountType')
                        .then(async (doc) => {
                            if (doc.accountType === 1) {
                                return await Users
                                    .update({ userEmail: args.userEmail },
                                        {
                                            $set: {
                                                firstName: args.firstName,
                                                lastName: args.lastName,
                                                userEmail: args.userEmail,
                                                userPassword: args.userPassword,
                                                userPhone: args.userPhone,
                                                userAddress: args.userAddress,
                                                userZip: args.userZip,
                                                userImage: args.userImage
                                            }
                                        })
                                    .then((update) => {
                                        console.log("profile updated");
                                        result = {
                                            success: true
                                        }
                                        resolve(result)
                                    })
                                    .catch(err => {
                                        console.log("profile not updated", err);
                                        result = {
                                            success: false
                                        }
                                        reject(result)
                                    });
                            } else {
                                return await Users
                                    .update({ userEmail: args.userEmail },
                                        {
                                            $set: {
                                                firstName: args.firstName,
                                                lastName: args.lastName,
                                                userEmail: args.userEmail,
                                                userPassword: args.userPassword,
                                                userPhone: args.userPhone,
                                                // userAddress: args.userAddress,
                                                // userZip: args.userZip,
                                                userImage: args.userImage,
                                                "restaurant.restName": args.restName,
                                                "restaurant.restAddress": args.restAddress,
                                                "restaurant.restZip": args.restZip,
                                                "restaurant.restPhone": args.restPhone,
                                                "restaurant.restImage": args.restImage,
                                                "restaurant.restDesc": args.restDesc
                                            }
                                        })
                                    .then((update) => {
                                        console.log("profile updated");
                                        result = {
                                            success: true
                                        }
                                        resolve(result)
                                    })
                                    .catch((err) => {
                                        console.log("profile not updated" + err);
                                        result = {
                                            success: false
                                        }
                                        reject(result)
                                    });
                            }
                        })
                        .catch(err => {
                            console.log("user Id not found", err);
                            result = {
                                success: false
                            }
                            reject(result)
                        })
                })
            }
        },
        additem: {
            type: updateProfileResult,
            args: {
                userEmail: {
                    type: GraphQLString
                },
                itemName: {
                    type: GraphQLString
                },
                itemType: {
                    type: GraphQLString
                },
                itemPrice: {
                    type: GraphQLInt
                },
                itemDesc: {
                    type: GraphQLString
                },
                cuisineName: {
                    type: GraphQLString
                },
                itemImage: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                console.log("In additem");
                console.log('args: ', args);
                return new Promise(function (resolve, reject) {
                    var getrestId = Users
                        .find({ userEmail: args.userEmail })
                        .select()
                        .then((result) => {
                            console.log("first result", result);
                            console.log("result.restaurant._id", result[0].restaurant._id);

                            var item = {
                                restId: result[0].restaurant._id,
                                cuisineName: args.cuisineName,
                                itemName: args.itemName,
                                itemType: args.itemType,
                                itemPrice: args.itemPrice,
                                itemImage: args.itemImage,
                                itemDesc: args.itemDesc
                            };

                            Users.findByIdAndUpdate(
                                result[0]._id,
                                { $push: { "restaurant.items": item } },
                                { new: true },
                                function (err, model) {
                                    if (model) {
                                        console.log("item added", model);
                                        result = {
                                            success: true
                                        }
                                        resolve(result)
                                    } else {
                                        console.log(err);
                                        result = {
                                            success: false
                                        }
                                        reject(result)
                                    }
                                }
                            );
                        })
                        .catch(err => {
                            console.log("error getting restId", err);
                            result = {
                                success: false
                            }
                            reject(result)
                        })
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

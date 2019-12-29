
Get All Cars
```

{
  cars {
    _id
    title
    brand    
  }  
}

```

Get Car By ID
```
{
  car(id: "5e0585e30a3c253ae44366dc") {
    title
    brand
    owner {
      _id
      firstName
      lastName
      email
    }
  }
}
```

```
{
  cars{
    title
    brand
    price
    owner{
      firstName
      lastName
      email
    }
    services{
      name
      date
    }
	}
}

```

Get a single car — car root query

```
{
  car (id: "5e0585e30a3c253ae44366dc"){
    title
    brand
    price
    owner{
      firstName
      lastName
      email
    }
    services{
      name
      date
    }
	}
}

```

Owner By Id

```
{
  owner (id: "5e0585e30a3c253ae44366c8"){
    firstName
    lastName
    email
  }
}

```

Service by id 
```

{
  service (id : "5e0585e40a3c253ae4437b0c"){
    name
    date
  }
}

```

Mutations

mutation {
    addCar (
        title : "Test Car",
        brand : "Test Brand",
        price : "2000",
        age : 20,
        owner_id : "5e0585e30a3c253ae44366c8"
    ){
        _id
        title
        brand
        price
        age
        owner_id
    }
}



Get Car By ID
```
{
  car(id: "5e05a3eb3f8d8256cc056014") {
    title
    brand
    owner {
      _id
      firstName
      lastName
      email
    }
  }
}
```

Edit Car

```
mutation {
    editCar(
        id : "5e05a3eb3f8d8256cc056014",
        title : "Test Car Updated",
        brand : "Test Brand Updated",
        price : "12000",
        age : 22,
        owner_id : "5e0585e30a3c253ae44366c8"
    ){
        _id
        title
        brand
        price
        age
        owner_id
    }
}
```


Delete Car 

```
mutation {
    deleteCar (
        id : "5e05a3eb3f8d8256cc056014"
    ){
        _id
    }
}
```
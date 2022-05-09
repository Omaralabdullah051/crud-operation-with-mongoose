const mongoose = require('mongoose');

//*class (dumb structure)
class player {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    getDetails() {
        return {
            name: this.name,
            country: this.country
        };
    }
}

//*Instance (actual object)
const mashrafi = new Player('Mashrafi', 'Bangladesh');
mashrafi.getDetails();    //*here getDetails is an Instance method



//?Mongoose Model Instance Method:
const todoSchema = new mongoose.Schema({ title: String });
//*here Schema is a class & todoSchema is an Instance. We create a actual todoSchema by using Schema class.
const Todo = new mongoose.model('Todo', todoSchema);
//*here model is a class & Todo is an Instance. We create a actual model(Todo) by using model class from mongoose.
//*And this actual model(Todo) is a Document class.(In mongoDB, all records are stored in a collection as document)
const todo = new Todo({ title: 'Learn Node.js' });
//*here Todo is a Document class & todo is an Instance. We created a actual Document(todo) by using Document class(Todo)

todo.save(); //*here save is an instance method of Model(Todo) because Instance method is situated under the class.so,here todo is a Document which is an instance of Todo Document class. And save Instance method is situated under the Document clas(Todo)
//*save is a mongoose built-in instance method. 


//TODO: Steps to implement mongoose built-in instance methods:
//*1. Create a schema from mongoose.Schema class.
//*2. Create a model (which is an another class) from mongoose.model class & pass schema to it.
//*3. Create a document using the model(Document class).
//*4. Call necessary model instance method using document.

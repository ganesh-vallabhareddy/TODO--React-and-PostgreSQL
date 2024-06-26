const express =require("express")
const app=express();
const cors= require("cors");
const pool =require("./db")

//middleware
app.use(cors());
app.use(express.json());

//Routes

//create a todo 
app.post("/todos",async(req,res)=>{
    try{
        const {description}= req.body;
        const newTodo= await pool.query("InSERT INTO todo (description) VALUES($1) RETURNING *",[description]);

        res.json(newTodo.rows[0]);


    }catch(err){
        console.log(err.message);
    }
})

//get all todo 
app.get("/todos",async(req,res)=>{
    try{
        const allTodos= await pool.query("select * from todo");
        res.json(allTodos.rows);
    }catch(err){
        console.log(err.message)
    }
})

// get a todo 
app.get("/todos/:id",async(req,res)=>{
    try{
        // console.log(req.params)
        const {id}=req.params;
        const todo=await pool.query("select * from todo where todo_id=$1",[id]);
        res.json(todo.rows[0])
        
    }catch(err){
        console.log(err.message)
    }
})

//update a todo 
app.put("/todos/:id",async(req,res)=>{
    try{
        // console.log(req.params)
        const {id}=req.params;
        const {description}=req.body
        const updateTodo=await pool.query("update todo set description=$1 where todo_id=$2",[description,id]);
        res.json("Todo is updated")
        
    }catch(err){
        console.log(err.message)
    }
})

//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try{
        // console.log(req.params)
        const {id}=req.params;
        const deleteTodo=await pool.query("delete from todo where todo_id=$1",[id]);
        res.json("Todo is deleted")
        
    }catch(err){
        console.log(err.message)
    }
})

app.listen(5000,()=>{
    console.log("server has started on port 5000");
})
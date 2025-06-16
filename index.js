import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express();
const client = new PrismaClient();

app.use(express.json());

// error handler 
const handleServerError = (err,res)=>{
    console.error(err)
    res.status(500).json({message: "Handling server Errors"})
}

app.get("/",(req, res)=>{
    res.send("<h1>Welcome to Users and posts Api</h1>")
})


//Get all users
app.get("/users", async(req,res)=>{
    try{
        const users =  await client.user.findMany()
        res.status(200).json(users)
    }
   catch(e){
    handleServerError(res,e)}
})


// get specific user
app.get("/users/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const getSpecificUser = await client.user.findUnique({
            where: {id}
        })
        if (!getSpecificUser) 
            return res.status(404).json({ message: "User not found" });
        res.status(200).json(getSpecificUser)

    }
    catch(e){
        handleServerError(res, e)
    }
    
})


// creating new user

app.post("/users", async(req,res)=>{
    try {
    const { firstName, lastName, emailAddress, userName } = req.body;
    if (!emailAddress || !userName) {
      return res.status(400).json({ message: "Missing unique fields" });
    }

   const newUser = await client.user.create({
    data: { 
        firstName, 
        lastName, 
        emailAddress,
         userName },
    });
    res.status(201).json(newUser)
        
    } catch (e) {
        handleServerError(res, e)
        
    }
})



app.get("/posts", async(req, res)=>{
try {
    const findPost  = await client.post.findMany()
    res.status(200).json(findPost)
    
} catch (e) {
    handleServerError(e,res)
    
}
});
// get user by id
app.get("/posts/:id", async(req,res)=>{
    try {
        const {id} = req.params;
    const getUserById = await client.post.findUnique({
        where: {id},
    });
    if (!getUserById){
        return res.status(404).json({message:"Post not found"});
        
    }
    res.status(200).json(getUserById);
        
    } catch (e) {
        handleServerError( e, res)
        
    }
});

app.post("/posts", async(req, res)=> {
    try{
        const {title , content} = req.body;
        if (!title || !content ){
            return res.status(400).json({message:"Title and content required"});
        }
        const newPost = await client.post.create({
            data:{title, content},
        });
    res.status(201).json(newPost) }
catch(e){
    handleServerError(e, res)
}
})
//  update post
app.patch("/posts/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const{title, content, isDeleted} =req.body;
        const updatePost =await client.post.update({
            where: {id},
        data:{
            title,
            content,
            isDeleted
        },  
        });
           res.status(200).json(updatePost);

        
    } catch (e) {
        if (e.code==='P2025'){
            res.status(404).json({message: "post not found"});
                       } 
                       else{
                handleServerError(e,res);
        }
        
    }
});

//  delete 
app.delete("/posts/:id",async(req,res)=>{
    try {
        const {id} =req.params;
         const deletePost = await client.post.update({
        where: { id },
        data :{ isDeleteD:true },
    });
  res.status(200).json({ message: "Post deleted", post: deletePost });

                  
    } catch (e) {
        if (e.code==='P2025'){
            res.status(404).json({message: "Task not found"})
        }
        else{
            handleServerError(e, res);
        }
    }
});
// end of delete restful
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Api running on port ${port}`)
)

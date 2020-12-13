import api from "./../api/index"
import * as types from "./../constants/actionTypes"
import axios from "axios"
import _ from "lodash"


export const createBook=async (data,Image)=>{
    console.log(Image);
    
    try {
        const book=await api.post(`api/books`,data)
        if(book.status===200){
            const identity={userId:book.data._id,type:Image.type}
            const uploadConfig=await api.post(`api/images/upload/`,identity)
            await  axios.put(uploadConfig.data.url,Image,{
                headers:{
                    'Content-type': Image.type
                }
            })
            const ImageUrl=uploadConfig.data.key
            const uploadBook=await api.put(`api/books/image/${book.data._id}`,{ImageUrl})
            return Promise.resolve({status:true,data: uploadBook.data})
        }
    } catch (err) {
        return {status: false,message:err.response.data.message}
    }
    
}

export const getBooks=(quantity)=>(dispatch)=>{
    return api.get(`api/books/size/${quantity}`)
        .then(res=>{
            const transData={status:0,bookList: res.data,to: quantity,currentDepartment: {},currentCategory: {}}
            dispatch({
                type: types.GET_BOOKS,
                payload: transData
            })
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            return ({status: false,message: "Not have Items yet"})
        })
}

export const getBookByName=(bookName)=>{
    return api.get(`api/books/name/${bookName}`)
        .then(res=>{
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            return ({status: false,message: "Not have Item yet"})
        })
}



export const getSimilarBooks=(id)=>{
    return api.get(`api/books/category/${id}`)
        .then(res=>{
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            return ({status: false,message: "Not have Item yet"})
        })
}

export const getBooksByAuthorName=(authorName,quantity)=>(dispatch)=>{
    return api.get(`api/books/author/${authorName}/${quantity}`)
        .then(res=>{
            const transData={
                status:4,
                bookList: res.data,
                to: quantity,
                currentDepartment: {},
                currentCategory: {}}
            dispatch({
                type: types.GET_BOOKS_BY_AUTHOR_NAME,
                payload: transData
            })
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            return ({status: false,message: err.response.data})
        })
}


export const getBooksByCategoryName=(departmentName,categoryName,quantity)=>(dispatch)=>{
    
    
    return api.get(`api/books/${departmentName}/${categoryName}/${quantity}`)
        .then(res=>{
            const transData={
                status:3,
                bookList: res.data,
                to: quantity,
                currentDepartment: res.data[0].department,
                currentCategory: res.data[0].category}
            dispatch({
                type: types.GET_BOOKS_BY_CATEGORY_NAME,
                payload: transData
            })
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{    
            return ({status: false,message: err.response.data})
        })
    
}
export const getBooksByDepartmentName=(departmentName,quantity)=>(dispatch)=>{

    
    return api.get(`api/books/${departmentName}/${quantity}`)
        .then(res=>{
            const transData={
                status:2,
                bookList: res.data,
                to: quantity,
                currentDepartment: res.data[0].department,
                currentCategory: {}}
            dispatch({
                type: types.GET_BOOKS_BY_DEPARTMENT_NAME,
                payload: transData
            })
            return Promise.resolve({status: true,data:res.data})
        })
        .catch(err=>{
            return ({status: false,message: err.response.data})
        })
    
}

let cancel
export const searchBooks=(name,quantity)=>async(dispatch)=>{
    if(cancel){
        console.log("Im in cancel");
        
        cancel.cancel()
    }
    
    cancel = axios.CancelToken.source()
    const data={name:name,quantity:quantity}
    return api({method:"post",url:"api/books/search",data,cancelToken: cancel.token})
        .then(res=>{
            console.log(res.data);
            
            const transData=res.data.map(item=>{return {...item._source,_id:item._id}})
            dispatch({
                type: types.SET_SEARCH_LIST,
                payload: {
                    status:1,
                    bookList: transData,
                    to: quantity,
                    currentDepartment: {},
                    currentCategory: {}
                }
            })
            return Promise.resolve({status: true,data:transData})
        })
        .catch(error=>{
            if(axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log('Request canceled', error.message);
                } else {
                // Handle usual errors
                console.log('Something went wrong: ', error.message)
                }
            return {status: false,message:error.message}
        })
}
export const adminSearchBooks=async (name,quantity)=>{
    if(cancel){
        console.log("Im in cancel");
        
        cancel.cancel()
    }
    
    cancel = axios.CancelToken.source()
    const data={name:name,quantity:quantity}
    return api({method:"post",url:"api/books/search",data,cancelToken: cancel.token})
        .then(res=>{
            const transData=res.data.map(item=>{return {...item._source,_id:item._id}})
            if(transData.length>0){
                return Promise.resolve({status: true,data:transData})
            }
            else{
                return Promise.resolve({status: false,data:transData})
            }
        })
        .catch(error=>{
            if(axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log('Request canceled', error.message);
                } else {
                // Handle usual errors
                console.log('Something went wrong: ', error.message)
                }
            return {status: false,message:error.message}
        })
}
export const loadMoreBooks=(data)=>(dispatch,getState)=>{
    const state=getState().books
    const quantity=state.to+12
    if(state.status===0){
        return dispatch(getBooks(quantity))
    }
    else if(state.status===1){
        return dispatch(searchBooks(data.name,quantity))
    }
    else if(state.status===2){
        return dispatch(getBooksByDepartmentName(data.departmentName,quantity))
    }
    else if(state.status===3){
        return dispatch(getBooksByCategoryName(data.departmentName,data.categoryName,quantity))
    } 
    else if(state.status===4){
        return dispatch(getBooksByAuthorName(data.authorName,quantity))
    }
}

export const sortBook=(data)=>(dispatch,getState)=>{
    const state=getState().books
    console.log(data);
    
    const sendData={...data,status: state.status,quantity:state.to}
    return api.post("api/books/sort",sendData)
        .then(res=>{
            let transData=res.data
            if(state.status===1){
                transData=res.data.map(item=>item._source)
            }
            dispatch({
                type:types.SET_BOOK_LIST,
                payload: transData
            })
            return Promise.resolve({status: true,data:transData})
        })
        .catch(error=>{
            return {status: false,message:error.message}
        })
}

export const updateBookByBookId=async (data,Image)=>{
    try {
        const book=await api.put(`api/books`,data)
        if(book.status===200 ){
            if(Image.status){
                const identity={userId:book.data._id,type:Image.image.type}
                const uploadConfig=await api.post(`api/images/upload/`,identity)
                await  axios.put(uploadConfig.data.url,Image.image,{
                headers:{
                    'Content-type': Image.image.type
                }
                })
                const ImageUrl=uploadConfig.data.key
                const uploadBook=await api.put(`api/books/image/${book.data._id}`,{ImageUrl})
                return Promise.resolve({status:true,data: uploadBook.data})
            }
            console.log("Image is empty");
            return Promise.resolve({status:true,data: book.data})
        }
    } catch (err) {
        return {status: false,message:err}
    }
}

export const deleteBookByBookId=(bookId)=>{
    return api.delete(`api/books/${bookId}`)
        .then(ret=>{
            return Promise.resolve({status: true,message:ret.data.message})
        })
        .catch(error=>{
            return {status: false,message:error.message}
        })

}



export const sendImage=async (url,Image)=>{
    await  axios.put(url,Image,{
        headers:{
            'Content-type': Image.type
        }
    })

}
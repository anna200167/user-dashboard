import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    data: [], 
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        addUsersData:(state,action)=>{
            state.data.push({...action.payload,rating:0,id:state.data.length+1});
        },

            editUsersData:(state,action)=>{
                // state.data.push({...action.payload,id:state.data.length+1});
                console.log("IN this function")
                const { id, values } = action.payload;
                console.log("IN this function" + "-----"+ id +"----" + values)

                const itemIndex = state.data.findIndex(item => item.id === id);
                console.log(itemIndex)

                if (itemIndex !== -1) {
                    state.data[itemIndex] = { ...state.data[itemIndex], ...values };
                }
            },
            updateStar:(state,action)=>{
                const {rate, id} = action.payload;

                const itemIndex = state.data.findIndex(item => item.id === id);

                if (itemIndex !== -1) {
                    state.data[itemIndex] = { ...state.data[itemIndex], rating:rate };
                }


            },
        deleteSingleUser:(state,action)=>{
          state.data =   state.data.filter((user)=>{
                console.log(user.id !== action.payload)
                return  user.id !== action.payload
            })
        },
      
    }

})

export const {deleteSingleUser,addUsersData,editUsersData,updateStar} = userSlice.actions;
export default userSlice.reducer;
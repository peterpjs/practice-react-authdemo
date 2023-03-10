import React, {useCallback, useContext, useState} from 'react';
import classes from './Student.module.css'
import StudentForm from "./StudentForm";
import {useDelStudentMutation} from "../../store/api/studentApi";

const Student = (props) => {

    const [isEdit,setIsEdit]=useState(false);

    const [delStudent, {isSuccess}]=useDelStudentMutation();

    // const ctx=useContext(StuContext)
    // const {loading,error,fetchData:delStu}=useFetch({url:`students/${props.stu.id}`,method:'delete'},ctx.fetchData)
    const deleteHandler=()=>{
        delStudent(props.stu.id);
        // delStu();
    }
    const cancelEdit=()=>{
        setIsEdit(false)
    }
    return (
        <>
            {(!isEdit&&!isSuccess)&&
            <tr >
                <td >{props.stu.attributes.name}</td>
                <td>{props.stu.attributes.gender}</td>
                <td>{props.stu.attributes.age}</td>
                <td>{props.stu.attributes.address}</td>
                <td>
                    <button onClick={deleteHandler}>删除</button>
                    <button onClick={()=>{setIsEdit(true)}} >修改</button>
                </td>
            </tr>}

            {
                isSuccess&&<tr>
                    <td colSpan="5">删除已删除  ！</td>

                </tr>
            }
            {isEdit&&<StudentForm stuId={props.stu.id} onCancel={cancelEdit}/>}

            {/*{loading&&<tr><td colSpan={5}>正在删除数据...</td></tr>}*/}
            {/*{error&&<tr><td colSpan={5}>删除失败...</td></tr>}*/}

        </>

    );
};

export default Student;

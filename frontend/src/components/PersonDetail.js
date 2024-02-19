import { useEffect, useState, React } from 'react'
import services from '../services/services'
import { useParams } from 'react-router-dom';

const PersonDetail = (props) => {

    let {id} = useParams();
    const [personDetail, setpersonDetail] = useState({ name: '', number: '' });

    useEffect(()=> {
        services
          .getDetail(id)
          .then(response => {
            console.log(response.data)
            setpersonDetail({name: response.data.name, number: response.data.number})
          })
       }, [])

    return (
        <div>
            <h1> Person id: {id} </h1>
            <h1> Person name: {personDetail.name} </h1>
            <h1> Person number: {personDetail.number} </h1>
        </div>
    );
}


export default PersonDetail
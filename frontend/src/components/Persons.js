import services from '../services/services'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';




const Persons = (props) => {
    /*Returns a list of filtered persons each with a delete button*/ 
   
    const handleDelete = (id) => {
      console.log(`Deleting  ${id}`)
      const resourceURL = `http://localhost:3001/persons/${id}`
      console.log(`Resource URL  ${resourceURL}`)    
      const resourceToDelete = props.people.find(x => x.id==id)
      if (window.confirm(` Delete ${resourceToDelete.name} ?`)) {
        services
          .destroy(resourceURL)
          .then(response => {
            console.log(`Deletion successful ${response}`)
            window.location.reload()
        })
          .catch(error => {
            console.log(`Error deleting resource ${error}`)
        })
      } 
    }
  
    const shownPerson = props.people.filter(x => x.name.toLowerCase().includes(props.filter.toLowerCase()))
  
  
    return (
      <div>
        <Table striped>
          <tbody>
        {shownPerson.map((elem, index) => {
          return (
            <tr key={elem.id}>
              <td> 
                <Link to={`/persons/${elem.id}`}> {elem.name}   </Link>            
              </td>
              <td> {elem.number} </td>
              <td>
                <button type='submit' onClick={() => handleDelete(elem.id)}> Delete </button>                 
              </td>
  
            </tr>
          )
          })}
          </tbody>
        </Table>
      </div>
    );
  }

  export default Persons
  


import React from 'react'
import {Table , TableBody,TableRow,TableCell,TableHead,Paper,Container} from '@material-ui/core'
import { DeleteForeverRounded , EditAttributesRounded } from '@material-ui/icons'
import { Modal , ModalBody, ModalHeader, ModalFooter,FormGroup,Label,Input  } from 'reactstrap'
import Axios from 'axios';


// Material ui ==> Google

class ManageMovie extends React.Component{
    //state
    state = {data : [] , 
            modalOpen : false,
            selectedEdit : 0
        }

    //lifecycle
    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    //functions

    RenderSinopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for(var i = 0 ; i < 5 ; i ++){
            newArr.push(arr[i])
        }

        return newArr.join(' ')
    }

    renderDataToJsx = () => {
        var jsx = this.state.data.map((val) => {
            return(
                <TableRow>
                    <TableCell>{val.id}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell> <img src={val.image} height='50px' /> </TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.playingAt.join(',')}</TableCell>
                    <TableCell>{val.duration}</TableCell>
                    <TableCell>{this.RenderSinopsis(val.sinopsis) + '....'}</TableCell>
                    <TableCell> <EditAttributesRounded /> </TableCell>
                    <TableCell> <DeleteForeverRounded /> </TableCell>
                </TableRow>
            )
        })
        return jsx
    }

    closeModal = () => {
        this.setState({modalOpen : false})
    }
    openModal = () => {
        this.setState({modalOpen : true})
    }

    onBtnSaveClick = () => {
        var playingAt = []

        if(this.refs.radio1.refs.radio1Inner.checked === true){
            playingAt.push(9)
        }
        if(this.refs.radio2.refs.radio2Inner.checked === true){
            playingAt.push(14)
        }
        if(this.refs.radio3.refs.radio3Inner.checked === true){
            playingAt.push(16)
        }
        if(this.refs.radio4.refs.radio4Inner.checked === true){
            playingAt.push(20)
        }
        if(this.refs.radio5.refs.radio5Inner.checked === true){
            playingAt.push(22)
        }
       
        var title = this.refs.title.value
        var sutradara = this.refs.sutradara.value
        var genre = this.refs.genre.value
        var imageLink = this.refs.imageLink.value
        var duration = this.refs.duration.value
        var sinopsis = this.refs.sinopsis.value

        var data = {
            title : title,
            genre : genre,
            sinopsis : sinopsis,
            playingAt,
            duration,
            sutradara,
            image : imageLink
        }
        if(title !== '' &&
           sutradara !== '' &&
           playingAt.length > 0 &&
           genre !== '' && 
           imageLink !== '' && 
           duration > 0 && 
           sinopsis !== '' ){
               Axios.post('http://localhost:2000/movies' , data )
               .then((res) => {
                var movieData = this.state.data
                movieData.push(res.data)
                this.setState({data : movieData , modalOpen : false})
            })
               .catch((err) => {
                   console.log(err)
               })
           }else{
               alert('Semua Form Harus Diisi')
           }

    
    }
    //render
    render(){
        return(
            <Container fixed>
                <h1> Manage Movie Page </h1>
                <input type='button' className='btn btn-success mb-3' value='Add Data' onClick={this.openModal} /> 
                {/* MODAL START */}

                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader>
                            Add Movie
                        </ModalHeader>
                        <ModalBody>
                            <input ref='title' type='text' className='form-control mt-2' placeholder='Title' />
                            <input ref='sutradara' type='text' className='form-control mt-2' placeholder='Sutradara' />
                            <input ref='genre' type='text' className='form-control mt-2' placeholder='Genre' />
                            <input ref='imageLink' type='text' className='form-control mt-2' placeholder='Image' />
                            <div className='mt-3'>
                                <FormGroup check inline>
                                    <Label>
                                        Playing At : 
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio1' innerRef='radio1Inner' type='radio' /> 09.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio2' innerRef='radio2Inner' type='radio' /> 14.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio3' innerRef='radio3Inner' type='radio' /> 16.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio4' innerRef='radio4Inner' type='radio' /> 20.00
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input ref='radio5' innerRef='radio5Inner' type='radio' /> 22.00
                                    </Label>
                                </FormGroup>
                            </div>
                            <input ref='duration' type='number' className='form-control mt-2' placeholder='Duration' />
                            <textarea ref='sinopsis' placeholder='sinopsis' className='form-control mt-2' />
                        </ModalBody>
                        <ModalFooter>
                            <input type='button' onClick={this.closeModal} value='cancel' className='btn btn-danger' />
                            <input type='button' value='Save' onClick={this.onBtnSaveClick} className='btn btn-success' />
                        </ModalFooter>
                    </Modal>

                {/* MODAL END */}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Played At</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {/* <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>ANNABELLE COMES HOME</TableCell>
                                <TableCell>Gary Dauberman</TableCell>
                                <TableCell> <img src='https://media.21cineplex.com/webcontent/gallery/pictures/156074568118284_452x647.jpg' height='50px' /> </TableCell>
                                <TableCell>Horror</TableCell>
                                <TableCell>{ [9,14,20].join(',') }</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Sinopsis</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow> */}
                            {this.renderDataToJsx()}
                        </TableBody>

                    </Table>
                </Paper>
            </Container>
        )
    }
}

export default ManageMovie


// export class Komp2 extends React.Component{
//     render(){
//         return(
//             <div>Ini Komp2</div>
//         )
//     }
// }


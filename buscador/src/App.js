
import {useState} from 'react';
import './style/style.css'
import { FiSearch } from 'react-icons/fi';
import api from './service/api';



function App() {
  const[input, setInput] = useState('');
  const [cep, setCep] = useState({});  

  async function handleSearch(){
    
    if (input === '') {
      alert('Preencha algum CEP ...')
      return;       
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')

    }catch{
      alert('ops erro ao buscar CEP')
      setInput('')

    }
  }



  return (
   <div className='container'>
    <h1 className="title">Buscador de CEP</h1>
    <div className="container-input">
      <input 
      type="text"
      placeholder="Digite seu CEP..." 
      value={input}      
      onChange={(e) => setInput(e.target.value)}
      />

      <button className="buttomSearch" onClick={handleSearch}>
        <FiSearch  size={25} color='#fff'/>
      </button>
    </div>


    {Object.keys(cep).length > 0 &&(

      <main className='main'>
        <h2 className='cep'>
          {cep.cep}
        </h2>
        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>Bairro:{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>DDD:{cep.ddd}</span>

      </main>

    )}
    

   </div>
  );
}

export default App;

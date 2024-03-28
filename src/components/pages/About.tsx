import React from "react";

// nome: função
const team = [
    {
        name: 'Carlos Alberto Ramalho',
        function: 'Líder',
        registration: '01585045',
    },
    {
        name: 'Márcio Sobel',
        function: 'Designer e desenvolvedor fullstack',
        registration: '01578025',
    },
    {
        name: 'Gustavo Portella Pachêco',
        function: 'Designer',
        registration: '01604533',
    },
    {
        name: 'Rafael Antônio Ribeiro Galvão Mendes',
        registration: '01604007',
        function: 'Tester',
    },
    {
        name: 'José Gabriel de Oliveira Lino',
        registration: '01609620',
        function: 'Tester',
    },
    {
        name:'Laryssa Rayanne Souza Martins',
        registration: '01612424',
        function: 'Tester',
    },
    {
        name: 'Rafael Ferreira dos Anjos',
        registration: '01579531',
        function: 'Tester'
    },
    {
        name: 'Débora Vitória Pereira do Nascimento',
        registration: '01634436',
        function: 'Frontend supporter'
    },
    {
        name: 'Diego Henrique Rodrigues',
        registration: '01650828',
        function: 'Frontend supporter'
    },
    {
        name: 'Eric Mendonça Batista de Santana',
        registration: '01447877',
        function: 'Frontend supporter',
    },
    {
        name: 'Jessica Nascimento Pessoa da Silva',
        registration: '01717533',
        function: 'Backend supporter',
    },
    {
        name: 'João Guilherme Cartano dos Santos',
        registration: '01481382',
        function: 'Backend supporter',
    },
    {
        name: 'João Victor Mendonça da Silva',
        registration: '01480878',
        function: 'Backend supporter',
    },
]

const About = () => {
    return (<div>
            <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                <h3 style={{textAlign: 'center'}}>Esta página ainda receberá uma estilização em CSS apropriada.</h3>
            </div>
            <h2>Sobre o PetFinder</h2>
            <p>
                PetFinder é um app que visa facilitar e democratizar
                a adoção de pets em busca de novos donos.
            </p>
            <br/>
            <h2>Sobre este website</h2>
            <p>
                O site é uma representação visual do banco de dados do
                aplicativo PetFinder. Ele deve lhe proporcionar todas as
                opções de CRUD para cada documento disponível.
            </p>
            <br/>
            <h2>Equipe</h2>
            {team.map((member, key) => {
                return (
                    <p key={key}>{`${member.name} (${member.registration}) — ${member.function}`}</p>
                )
            })}
            <br/>
            <h2>Repositório do Github</h2>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder-website" target="#">
                Repositório deste site ↗
            </a>
            <br/><br/>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder" target="#">
                Repositório do aplicativo ↗
            </a>
            <br/><br/>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder-api" target="#">
                Repositório da API ↗
            </a>
            <br/><br/>
        </div>
    )
};

export { About };
# Gráfico do Bitcoin

********Uma breve descrição do funcionamento e da criação dessa plataforma.********

## Funcionalidades

- ******************************************************************************************************Ao abrir a plataforma, será carregado um gráfico com dados de preço do Bitcoin dos últimos 730 dias (2 anos).******************************************************************************************************
- **********Na tela principal, após o nome da moeda “Bitcoin” está indicado o valor atual da moeda de acordo com o ultimo dado registrado pela API (CoinGecko).**********
- ************Logo após o gráfico, temos dois “inputs” de data, podendo assim, filtrar os dados do gráfico para um intervalo de tempo especifico.************
- **********************************************Não é possível inserir datas antes de 1 de Janeiro de 1970 ou usar o botão “Enviar” com os “inputs” vazios.**********************************************

## Criação

- **********************************************************Para criar os gráficos foi utilizada uma biblioteca chamada “[react-chartjs-2](https://react-chartjs-2.js.org/)”, inserindo o componente “Line” na aplicação e passando os parâmetros necessários para formar o gráfico de linhas.**
- ********************************A aplicação foi dividida em dois componentes, sendo eles:********************************
    - ****************BitcoinInfo, responsável por mostrar os dados da moeda, como, nome e valor atual.****************
    - ************************************BitcoinGraph, responsável por mostrar o gráfico e realizar a operação de consumir a API, juntamente com os “inputs” de data.************************************
- ****************************************************Para consumir a API que mostra os dados em um intervalo especifico de tempo é necessário passar o tempo UNIX, para isso, obtemos o valor de cada “input” e transformamos esse valor da seguinte maneira:****************************************************

```jsx
parseInt((new Date(e.target.value).getTime() / 1000).toFixed())
/*O Comando new Date(valor).getTime(), transforma o valor do input em tempo UNIX.
	é preciso dividir por 1000 para se encaixar no padrão da API e logo em seguida
aplicar o ".toFixed()" para garantir que não tenha casas decimais.*/
//e.target.value é o valor do "input" data.

```
import styled from 'styled-components';
export const Wrapper = styled.div`
    width:100%;
    padding:20px ;
    min-width:800px;
    font-size:14px;
    .item_input{
         margin-bottom:10px;
        .inputValues{
            width:90%;
        }
        .inputValues1{
            vertical-align:top;
            display:inline-block;
        }
    }
    .bottom{
        margin:100px 0;
        text-align:right;
        .close{
            background:rgb(208,208,208);
            border:0;
        }
        .button{
            margin:0 10px;
        }
    }
`
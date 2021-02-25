import styled from 'styled-components';
export const WorpShoopList = styled.div`
    width:100%;
    .nav{
        width:100%;
        background:rgb(245,245,245);
    }
    .table{
        text-align:center;
    }
`
export const Title = styled.div`
    width:50%;
    
    height:50px;
    text-align: left;
    display:-webkit-box;
    display:flex;
    line-height:50px;
    font-size:14px;
    .title_item{
        cursor: pointer;
        display:inline-block;
        flex:1;
        text-align:center;
        /* margin-top:32px */
        .title_border{
            background:rgb(245,245,245);
            width:100%;
            height:1px;
        }
    }
    .title_item:hover{ 
        background:#fff;
        color:#00b4ed;
        .title_border{
            background:#00b4ed;
            width:80%;
            height:1px;
            margin: 0 auto;
        }
    }
    .title_item_selec{
        background:#fff;
        color:#00b4ed;
        .title_border{
            background:#00b4ed;
            width:80%;
            height:1px;
            margin: 0 auto;
        }
    }
`
export const Nav = styled.div`
    /* width:100%; */
    margin:20px;
    font-size:14px;
    .inputValues{
        width:15%;
    }
    .button{
        margin:0 20px;
        width:8%;
    }
`
export const Content = styled.div`
    width:100%;
    text-align:center;
    .xiaClose{
        background:#f00;
        border:0;
    }
    .Pagination{
        margin:10px 0;
    }
`
import styled from 'styled-components';
export const HeaderWrapper = styled.div`
    width:100%;
    min-width:1206px;
    height:60px;
    background-image: linear-gradient(rgb(50,222,234), rgb(0,191,255));
    line-height:60px;
    z-index:999;
    position:fixed;
    top:0;
    .caidanlan{
        background-image: linear-gradient(rgb(50,222,234), rgb(0,191,255));
        line-height:15px;
        border:0;
        font-size:16px;
        vertical-align:middle;
        display:inline-block;
        cursor: pointer;
    }
    .icno{
        display:inline-block;
        vertical-align:middle;
    }
    
`
export const Headline = styled.div`
    font-size:18px;
    /* vertical-align:middle; */
    display:inline-block;
    padding:0 30px;
    .icno{
        /* margin-top:5px; */
    }
`
export const HeaderImg = styled.div`
    float:right;
    padding:0 30px;
`

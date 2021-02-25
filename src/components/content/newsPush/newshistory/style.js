import styled from 'styled-components';
export const Wrapper = styled.div`
    width:100%;
    height:100%;
    background:rgb(248,248,248);
    font-size:14px;
    min-width:800px;
    text-align:center;
    .content{
        background:#fff;
        margin-bottom:10px;
        padding:20px;
        border-radius:10px;
        position: relative;
        text-align:left;
        .title{
            .type_img{
                width:20px;
                display:inline-block;
                vertical-align:middle;
            }
            .type{
                display:inline-block;
                vertical-align:middle;
                margin-left:10px;
            }
            
        }
        .newInfo{
            font-size:12px;
            margin-top:10px;
            margin-left:30px;
            color:#9a9a9a;
            p{
                line-height:1.5;
            }
        }
        .timer{
            font-size:12px;
            position:absolute;
            right: 20px;
            top:20px;
        }
    }
`
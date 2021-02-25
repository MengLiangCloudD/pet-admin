import styled from 'styled-components';
export const Wrapper = styled.div`
    width:100%;
    padding:20px;
    min-width:800px;
    font-size:14px;
    .item_input{
        margin-bottom:10px;
        .mao{
            opacity:0;
        }
        .tishi{
            display:inline-block;
            color: rgb(154,154,154);
            padding:10px 0;
        }
        .lable_inp{
            vertical-align:top;
            display:inline-block;
            margin-top:10px;
            .mao{
                opacity:0;
            }
        }
        .inputValues{
            
            width:90%;
        }
        .inputValues1{
            vertical-align:top;
            display:inline-block;
        }
        .addImg{
            display:inline-block;
            text-align:center;
            background:rgb(248,248,248);
            /* padding:28px; */
            color: rgb(154,154,154);
            width:120px;
            height:120px;
            margin-right:20px;
            position: relative;
            vertical-align:top;
            /* overflow:hidden; */
            .file{
                position:absolute;
                cursor: pointer;
                top:0;
                left:0%;
                opacity:0;
                .btn{
                    width:120px;
                    height:120px;
                }
            }
            .info{
                display:inline-block;
                margin:28px auto;
                img{
                    width:30px;
                }
                p{
                    margin-top:3px;
                }
            }
            .meitu{
                width:30px;
                margin:48px auto;
                display:inline-block;
            }
            .item_img{
                width:100%;
            }
            .item_imgs{
                width:100%;
                height:100%;
            }
            .cha{
                width:15px;
                position:absolute;
                right: -5px;
                top:-5px;
            }
            
        }
    }
    .bottom{
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
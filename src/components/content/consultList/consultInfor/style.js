import styled from 'styled-components';
export const ContentWorp = styled.div`
    width:100%;
    height:100%;
    min-width:800px;
    /* background:#ccc; */
    .List::-webkit-scrollbar {
        display: none;
    }
`

export const List = styled.div`
    width:25%;
    height:100%;
    vertical-align:top;
    display:inline-block;
    border-right:1px solid rgb(238,238,238);
    overflow-y: scroll;
    /* background:#ccc; */
    
    .zanwu{
        width:100%;
        text-align:center;
    }
    .list1{
        background:rgb(249,249,249);
    }
    .list{
        cursor: pointer;
        width:100%;
        height:80px;
        border-bottom:1px solid rgb(238,238,238);
        line-height:80px;
        position: relative;
        .list_img{
            width:50px;
            height:50px;
            border-radius:50%;
            /* background:#000; */
            display:inline-block;
            vertical-align:middle;
            margin:0 10px;
            overflow: hidden;
            .imger{
                width:100%;
            }
        }
        .list_content{
            display:inline-block;
            vertical-align:middle;
            margin:0 20px;
        }
        .list_icno{
            width:5px;
            height:5px;
            border-radius:50%;
            background:rgb(3,193,254);
            display:inline-block;
            vertical-align:middle;
            margin:0 10px;
            position:absolute;
            right: 3%;
            top:38px;
        }
        .list_icno1{
            background:#f00;
        }
        .list_icno2{
            display:inline-block;
            vertical-align:middle;
            margin:0 10px;
            position:absolute;
            right: 3%;
            top:38px;
            width:15px;
            height:10px;
            background-image: url('https://p-wosj.oss-ap-south-1.aliyuncs.com/duihao%402x.png') ;
            background-repeat: no-repeat;
            background-size:100% 100%; 
        }
    }
    .odder_info{
        line-height: 2;
        padding: 1;
        padding: 10px;
        font-size: 12px;
        background: rgb(248,248,248);
        border-top: 1px solid rgb(238,238,238);
        border-bottom: 1px solid rgb(238,238,238);
    }
    
`
export const Worps = styled.div`
    width:75%;
    height:100%;
    
    vertical-align:top;
    display:inline-block;
    /* background:#ccc; */
    .zanwu{
        width:80%;
        text-align:center;
        /* display:inline-block; */
        margin:20px auto;
        .primary{
            margin-top:20px;
        }
    }
`

export const Content = styled.div`
    width:100%;
    height:65%;
    border-bottom:1px solid #eee;
    overflow:auto;
    padding-bottom:30px;
    overflow-y: scroll; 
`
export const Message = styled.div`

`
export const ContentLeft = styled.div`
    width:100%;
    margin-top:30px;
    .left_item{
        margin-left:42px;
        max-width:70%;
        .titTime{
            margin:10px 50px;
        }
        .left_imgheard{
            width:50px;
            height:50px;
            border-radius:50%;
            /* background:#000; */
            display:inline-block;
            vertical-align:middle;
            margin-right:24px;
            overflow:hidden;
            .imger{
                width:100%;
            }
        }
        .left_txt{
            display:inline-block;
            vertical-align:middle;
            .audo{
                width:258px;
                .time_text{
                    vertical-align:middle;
                    color:#000;
                    display:inline-block;
                    margin-right:10px;
                }
                .time_img{
                    vertical-align:middle;
                }
            }
            .left_txt_img{
                display:inline-block;
                vertical-align:middle;
            }
            .left_txt_message{
                max-width:285px;
                display:inline-block;
                vertical-align:middle;
                min-width:50%;
                padding:10px 30px;
                font-size:16px;
                line-height:1.3;
                color:#fff;
                border-radius:10px;
                background:rgb(3,193,254);
                box-shadow: 1px 2px 3px 2px  rgba(238,237,237,0.6) ;
            }
            .content_img{
                max-width: 205px;
            }
        }
    }
        
`
export const ContentRight = styled.div`
    width:100%;
    margin-top:30px;
    text-align:right;
    .right_item {
        margin-right:42px;
        /* max-width:70%;
        display:inset-block; */
        .titTime{
            margin:10px 50px;
        }
        .right_imgheard{
            width:50px;
            height:50px;
            border-radius:50%;
            display:inline-block;
            vertical-align:middle;
            margin-left:24px;
            overflow:hidden;
        }
        .img_header{
            width:50px;
            height:50px;
            border-radius:50%;
        }
        .right_txt{
            display:inline-block;
            vertical-align:middle;
            .right_txt_img{
                display:inline-block;
                vertical-align:middle;
            }
            .right_txt_message{
                text-align:left;
                max-width:285px;
                display:inline-block;
                vertical-align:middle;
                min-width:50%;
                padding:10px 30px;
                font-size:16px;
                line-height:1.3;
                color:#000;
                border-radius:10px;
                background:#fff;
                box-shadow: 1px 2px 3px 2px  rgba(238,237,237,0.6) ;

            }
            .content_img{
                max-width: 205px;
            }
        }
    }
`
export const Bottom = styled.div`
    width:100%;
    height:35%;
    padding:20px 30px;
    position: relative;
    .bordet{
        width:100%;
        border:0;
        outline:none;
        resize:none;
        margin-top:10px;
    }
    .bottom_title{
        .inputValue{
            width:400px;
        }
        .wenzi{
            display:inline-block;
            
        }
        .biaoqing{
            background:#fff;
            display:inline-block;
            
            margin-left:50px;
            cursor: pointer;
        }
        .tupian{
            position: relative;
            background:#fff;
            display:inline-block;
            
            margin-left:30px;
            cursor: pointer;
            .file{
                position:absolute;
                cursor: pointer;
                top:0;
                left:-50%;
                opacity:0;
            }
        }
    }
    .btn{
        position:absolute;
        right: 38px;
        bottom:50px;
        width:130px;
    }
    .default{
        position:absolute;
        right: 188px;
        bottom:50px;
       
    }
`

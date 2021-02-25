import styled from 'styled-components';
export const OrderWrapper = styled.div`
    width:calc(100% - 206px);
    height: 100%;
    min-width:800px;
    padding-bottom:50px;
    position: fixed;
    background-size: contain;
    background-attachment:fixed;
    min-width:800px;
     overflow-y: scroll;
     .order_list{
         height:calc(100% - 50px)
     }
`
export const Title = styled.div`
    width:100%;
    background:rgb(245,245,245);
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
    padding:20px 55px;
    width:100%;
    height: 20%;
    border-bottom:1px solid rgb(241,241,241);
    font-size:14px;
    .inputValue{
        width:80%;
        display:inline-block;
        vertical-align:middle;
        .inputer{
            width:30%;
            margin:5px 0;
        }
        .inputer_time{
            width:100%;
            margin:5px 0;
        }
        .label{
            margin-left:10%;
        }
    }
    .buttonValue{
        display:inline-block;
        vertical-align:middle;
        width:20%;
        .btn{
            width:43%;
            margin:0 3%;
        }
        .chong{
            background:#dcdcdc;
            border:0;
        }
    }
    
`
export const Content = styled.div`
    width:100%;
    height: calc(80% - 10px);
    .content_title{
        width:100%;
        height:30px;
        line-height:30px;
        display:-webkit-box;
        display:flex;
        font-size:12px;
        margin:15px 0 ;
        .content_title_item{
            display:inline-block;
            flex:1;
            text-align:center;
        }
    }
    .item_table{
        width:100%;
        overflow-y: scroll; 
        scrollbar-width:none;
        height:calc(100% - 130px);
        .content_item{
            width:100%;
            .content_item_title{
                width:100%;
                /* height:30px; */
                display:-webkit-box;
                display:flex;
                font-size:12px;
                background:rgb(241,241,241);
                padding:10px 0;
                .content_item_title_item{
                    cursor: pointer;
                    display:inline-block;
                    flex:1;
                    text-align:center;
                    .img_text{
                        color:#00b4ed;
                        display:inline-block;
                        vertical-align:middle;
                    }
                    .imagers{
                        display:inline-block;
                        vertical-align:middle;
                        margin-left:10px;
                    }
                }
            }
            .item_content{
                width:100%;
                /* height:30px; */
                /* display:-webkit-box; */
                /* display:flex; */
                font-size:12px;
                padding:10px 0;
                .item_content_element{
                    display:inline-block;
                    /* flex:1; */
                    width:20%;
                    text-align:center;
                    vertical-align:middle;
                    .item_content_element_item{
                        margin:20px 0;
                        .shoopimg{
                            vertical-align:middle;
                            margin:0 2px;
                            display:inline-block;
                        }
                    }
                    .zhaungtai{
                        color:#03c1fe;
                    }
                    .zhaungtais{
                        color:#f00;
                    }
                    p{
                        line-height:1.5
                    }
                }
            }
            
        }
    }
    .item_bottom{
        text-align:center;
        padding:20px 0;
        .ant-pagination{
            display:inline-block;
        }
    }    
`
export const ContentOrderInfo = styled.div`
    width:100%;
    height: calc(75% - 60px);
    margin:20px;
    .fanhui{
        cursor: pointer;
        color:#03c1fe;
        margin-left:20px;
    }
    .info_item{
        padding:20px;
        width:100%;
        position: relative;
        padding-bottom:60px;
        border-bottom:1px solid rgb(241,241,241);
        .info_title{
            width:100%;
            .gang{
                display:inline-block;
                width:3px;
                height:15px;
                background:#00b4ed;
                vertical-align:middle;
            }
            .info_title_text{
                display:inline-block;
                vertical-align:middle;
                margin-left:15px;
                font-size:14px;
                line-height:1.5;
            }
        }
        .content_info{
            padding-left: 18px;
            font-size:12px;
            margin-top:20px;
            p{
                line-height:2;
                .biaoti{
                    color:#ddd;
                }
            }
            .order_info_biao{
                display:inline-block;
                vertical-align:middle;
            }
            .order_info_biao2{
                display:inline-block;
                vertical-align:middle;
                margin-left:30px;
            }
            .shoop_info_order_title1{
                background:#eee;
                padding:10px 0;
            }
            .shoop_info_order_title{
                /* width:100%; */
                display:-webkit-box;
                display:flex;
                margin-top:15px;
                margin-right:15px;
                .shoopimg{
                            vertical-align:middle;
                            margin:0 2px;
                            display:inline-block;
                        }
                .shoop_info_order_title_item{
                    display:inline-block;
                    flex:1;
                    text-align:center;
                }
            }
            .wulliu_order_info_title{
                /* width:100%; */
                display:-webkit-box;
                display:flex;
                margin-right:15px;
                /* padding:20px 0; */
                height:50px;
                line-height:50px;
                border:1px solid rgb(241,241,241);
                .wulliu_order_info_title_item{
                    display:inline-block;
                        flex:1;
                        text-align:center;
                        border-right:1px solid rgb(241,241,241);
                }
                .wulliu_order_info_title_item1{
                    border-right:0;
                }
            }
            .wulliu_order_info_title1{
                border-top:0;
            }
            .bottom_info_order{
                position:absolute;
                display:inline-block;
                right: 10%;
                bottom:0px;
                color:#000;
                
            }
        }
        .bottom_info{
            position:absolute;
            right: 10%;
            bottom:0px;
            padding:20px 0;
            .btn{
                    margin:0 10px;
            }
            .chong{
                background:#dcdcdc;
                border:0;
            }
        }
    }
    .info_item1{
        padding-bottom:150px;
        
        .wuliuValue{
            width:200px;
        }
    }
`
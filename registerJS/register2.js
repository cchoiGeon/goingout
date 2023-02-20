var a = function(css,campuslist,script){
    return`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>외출</title>
        ${css}
        <style>
            table {
                width: 100%;
                border-top: 1px solid #444444;
                border-collapse: collapse;
            }
            th, td {
                border-bottom: 1px solid #444444;
                border-left: 1px solid #444444;
                padding: 10px;
            }
            th:first-child, td:first-child {
                border-left: none;
            }
        </style>
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
    </head>
    <body class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">회원가입</h3></div>
                                    <div class="card card-body">
                                        <p>
                                            <h4>대학교를 선택해주세요</h4>
                                        </p>
                                        <p>
                                            * 본인의 학교로 설정해야 됩니다.<br>          
                                            * 해당 대학교의 풀네임을 입력하셔야 됩니다. <br>
                                            * 학교 이름이 나오지 않는다면 문의 주세요.               
                                        </p>
                                    </div>
                                    <div class="card-body">
                                        <form action="/register2/process" method="post">
                                            <table> 
                                                ${campuslist}
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <script>
            function search(){
                let searchcampus = document.getElementById('searchcampus')
                let campusname = document.getElementById('campusname')
                let selectcampus = document.getElementsByName("selectcampusall")
                if(campusname.value === selectcampus.value){
                    searchcampus.style.display =='none';
                }
            }
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        ${script}
    </body>
</html>
`
}
module.exports =a;
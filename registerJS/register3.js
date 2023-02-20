var a = function(css,script){
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
                                    <div class="card-header">
                                        <h3 class="text-center font-weight-light my-4">회원가입</h3>
                                    </div>
                                    <div class="card card-body">
                                        <p>
                                            <h4>학생증을 업로드 해주세요</h4>
                                        </p>
                                        <p>
                                            * 학생증 증명을 안 할시 해당 웹 사이트를 사용 할 수 없습니다. <br>
                                            * 학생증 증명에 실패하면 해당 아이디가 잠길 수 있습니다.<br>
                                            * 타인의 학생증을 도용할 시 법적인 책임을 질 수 있습니다.<br>
                                            * 학생증 인증 완료까지 5~10분 정도 소요됩니다.                              
                                        </p>
                                    </div>
                                    <div class="card-body">
                                        <form action="/register3_process" method="post" enctype="multipart/form-data">
                                            <div class="form-floating mb-3" id="card">
                                                <div class="input-group mb-3">
                                                    <input type="file" class="form-control" name="card" id="inputGroupFile02">
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <div class="d-grid"><button class="btn btn-primary btn-block" type="submit">회원가입 완료</button></div>
                                            </div>
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
            
        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
        ${script}
    </body>
</html>
`
}
module.exports =a;
openssl genrsa -out quiz-apl.key.pem 2048
openssl req -new -sha256 -key quiz-apl.key.pem -out quiz-apl.csr.pem
openssl x509 -req -in quiz-apl.csr.pem -signkey quiz-apl.key.pem -out quiz-apl.cert.pem
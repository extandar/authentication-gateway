
/*
curl  -H "Content-Type: application/json" \
	-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMTAxNGYxYzBlMzkyNDlmZjBhODU1OCIsImVtYWlsIjoiYXJvbGRmQGdtYWlsLmNvbSIsInBlcm1pc2lvbnMiOltdLCJpYXQiOjE2NjIwMDIzNjksImV4cCI6MTY2MjAwMjY2OX0.l43QXfxIGWfowlfH5s2OH8UelMOWberLPcUlsRWQdpc" \
	-d '{"language":"es","userId":"aroldf@gmail.com"}' \
	-X POST http://localhost:2021/api/test/auth/test/user
*/

exports.user = function(req, res) {

	const userId = req.userId

	if(!userId){
		res.status(400).send({ error: 'Test failed. There no a userId' });
	}else{
		res.json({
			resultSet: { userId: userId },
			message: 'ok'
		});
	}

};

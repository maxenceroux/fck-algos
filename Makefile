build:
	docker build -t fck-algos .

start:
	docker run --rm --name fck-algos -p 3005:3005 --env-file .env  -v my_shared_volume_fck_algo:/app/build fck-algos
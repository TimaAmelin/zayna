CTC_ARGS=$(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

default: status

run:
	bun run --cwd ./knitting $(CTC_ARGS)

stop-all:
	docker stop $(docker ps -q)

logs:
	docker compose logs -fn 500 $(CTC_ARGS)

status:
	docker ps $(CTC_ARGS)

clear:
	docker system prune -fa

CTC_FILTERED_ARGS=$(filter-out --no-detach, $(CTC_ARGS))

start:
	docker compose --progress plain --env-file .env.local --file compose.yaml up $(CTC_FILTERED_ARGS)

start-dev:
	docker compose --progress plain --env-file .env.local --file compose.development.yaml up $(CTC_FILTERED_ARGS)

%::
	@true

.PHONY: *


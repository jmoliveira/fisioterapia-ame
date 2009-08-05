normal      :=
red         :=
green       :=
yellow      :=
blue        :=
white       :=
noprogress  := -v 1

help:
	@echo -n $(blue)
	@echo 'USAGE: make <target>'
	@echo -n $(normal)
	@echo '-----------------'
	@echo 'Available targets'
	@echo '-----------------'
	@echo '    clean..............removes all .pyc files and all reports'
	@echo '    db.................drops, recreates and populates the db'
	@echo '    ame_up...........starts fisio website in background'
	@echo '    ame_down.........kills fisio website'
	@echo "    runserver..........clear and populate de database and run django's development server"

all: clean
db: drop_db create_db migrate_db

clean:
	@echo "Cleaning up build and *.pyc files..."
	@find . -name '*.pyc' -exec rm -rf {} \;
	@rm -rf build

drop_db:
	@echo -n $(red)
	@echo "Dropping database..."
	@echo -n $(white)
	@mysql -u root -e 'DROP DATABASE IF EXISTS glb_fisioterapiaame;'
	@echo -n $(normal)

create_db:
	@echo "Creating database..."
	@echo -n $(white)
	@mysql -u root -e 'CREATE DATABASE IF NOT EXISTS glb_fisioterapiaame;'
	@echo -n $(green)
	@echo 'Database `glb_fisioterapiaame` created!'
	@echo -n $(normal)
	
migrate_db:
	@echo "Migrating database..."
	@echo -n $(white)
	@db-migrate -c ame/migrations/ame.conf
	@echo -n $(green)
	@echo "Database migrated!"
	@echo -n $(green)
	@echo "DONE"
	@echo -n $(normal)

fisioterapiaame_up: fisioterapiaame_down
	@echo -n $(green)
	@echo "Running fisioterapiaame..."
	@nohup python manage.py runserver -v 0 --noreload 0.0.0.0:8000 > /dev/null 2>&1 &
	@echo -n $(normal)

fisioterapiaame_down:
	@echo -n $(blue)
	@echo "Killing fisioterapiaame..."
	@-ps aux | egrep 'runserver' | egrep '8000' | egrep -v grep | awk '{ print $$2 }' | xargs kill -9
	@echo -n $(normal)

wait:
	@echo -n $(yellow)
	@echo "Waiting for 5 seconds..."
	@sleep 5
	@echo -n $(normal)

gen_version:
	@echo `git rev-parse master` > CURRENT_VERSION

tarball: gen_version
	@echo -n $(blue)
	@echo "Generating ame's tarball artefact..."
	@echo -n $(white)
	@tar cjf fisioterapiaame.tar.bz2 ame CURRENT_VERSION
	@echo "DONE: generated as fisioterapiaame.tar.bz2"
	@echo -n $(normal)

runserver: db
	@echo -n $(green)
	@echo "Running Django runserver"
	@echo -n $(normal)
	@python manage.py runserver 0.0.0.0:8000

shell:
	@echo -n $(green)
	@echo "Openning up django shell for fisioterapiaame project"
	@echo -n $(normal)
	@python manage.py shell

#/bin/bash
#
STATUS=0
function get_result() {
    if [[ "$2" != "$3" ]]
    then
        echo "❌ - Test: $1 An error occurred:\n Expected $2 but got $3"
        STATUS=1
    else
        echo "✅ - Test: $1 Success!"
    fi
}
# Is server UP ? 
LOG=$(curl -s -X POST http://localhost:42069/ping)
get_result "Is server up ?" "{\"status\":200,\"message\":\"Pong!\"}" "$LOG"

# Does server allow login  with corrrect credentials ?
LOG=$(curl -s -d "user=User&password=Password" -X POST http://localhost:42069/login)
get_result "Logging with correct crendentials" '{"status":200,"message":"done"}' $LOG

# Incorrect crendentials
LOG=$(curl -s -d "user=LOLBADUSER&password=Password" -X POST http://localhost:42069/login)
get_result "Logging with incorrect crendentials" '{"status":401,"message":"error"}' $LOG

# Missing Username
LOG=$(curl -s -d "password=Password" -X POST http://localhost:42069/login)
get_result "Logging with missing username" '{"status":400,"message":"error"}' $LOG

# Missing Password
LOG=$(curl -s -d "user=User" -X POST http://localhost:42069/login)
get_result "Logging with missing password" '{"status":400,"message":"error"}' $LOG

# Teapot test
LOG=$(curl -s -X GET http://localhost:42069/teapot)
get_result "Teapot test" '{"status":418,"message":"teapotlol"}' $LOG


exit $STATUS
#curl -d "user=DocumentationUser&password=test" -X POST http://localhost:42069/register
#curl  http://localhost:42069/teapot
#curl -d "user=DocumentationUser&password=test" -X POST http://localhost:42069/ping

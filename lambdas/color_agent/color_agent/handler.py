from modules.agent import ColorAgent
from modules.config import model
import json
def lambda_handler(event, context):
    body = json.loads(event["body"])
    purpose = body["purpose"]
    agent = ColorAgent(model)
    result = agent.run(purpose)
    print("result finally",result)

    # result の中身に Purpose インスタンスなどがあるため、手動で全部辞書化する
    serialized = {
        "suggestions": [s.model_dump() for s in result["suggestions"]],
        "judge_reason": result["judge_reason"],
        "purpose": result["purpose"].model_dump() if "purpose" in result else None
    }

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        "body": json.dumps(serialized, ensure_ascii=False)
    }
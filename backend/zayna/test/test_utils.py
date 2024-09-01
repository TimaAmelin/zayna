from unittest import TestCase
from ..utils import *
import json
import itertools


class TicTacToeTestCase(TestCase):
    def test_next_step(self):
        result = next_step(
            [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ]
        )
        body = json.loads(result.content)
        field = body.get("field")
        flat_field = itertools.chain(*field)
        self.assertIn(-1, flat_field)

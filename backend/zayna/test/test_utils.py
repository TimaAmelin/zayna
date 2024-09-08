import itertools
import json
from unittest import TestCase

from ..utils import *


class TicTacToeTestCase(TestCase):
    def test_next_step(self):
        User.objects.create()
        result = next_step(
            1,
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

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WordleController extends Controller
{
    public function checkWord(Request $request)
    {
        $inputLetters =  $request->data;
        $targetWord = $request->randomword;
        $count = 0;
        $targetLetters = str_split($targetWord);
        $matchedLetters = [];
        for ($i = 0; $i < count($inputLetters); $i++) {
            $iletter = Str::lower($inputLetters[$i]);
            if ($iletter == $targetLetters[$i]) {
                $count++;
                $matchedLetters[$i] = [
                    'position' => $i,
                    'state' => 0, // Exact match
                    'letter' => $iletter,
                    'count' => $count
                ];
            } elseif (in_array($iletter, $targetLetters)) {
                // Check if the letter exists in the target word but not in the same position
                $matchedLetters[$i] = [
                    'position' => $i,
                    'state' => 1, // Exists but not at the same position
                    'letter' => $iletter,
                    'count' => $count

                ];
            } else {
                $matchedLetters[$i] = [
                    'position' => $i,
                    'state' => -1, // Does not exist
                    'letter' => $iletter,
                    'count' => $count
                ];
            }
        }
        return response()->json($matchedLetters);
    }
}

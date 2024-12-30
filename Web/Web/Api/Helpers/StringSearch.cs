using Api.Models;
using FuzzySharp;
using Microsoft.EntityFrameworkCore;

namespace Api.Helpers
{
    public class StringSearch
    {
        public static bool stringSearch(string searchTearm, string searchString)
        {
            try
            {
                var searchItem = searchString!.ToLower().Split(" ");
                bool isMatch = false;
                foreach (var word in searchItem)
                {
                    // Fuzzy matching logic using your chosen library
                    var matchRatio = Fuzz.Ratio(word, searchTearm.ToLower());
                    if (matchRatio >= 50) // Set a threshold for acceptable similarity
                    {
                        isMatch = true;
                        break; // Exit inner loop if a match is found
                    }
                }
                return isMatch;                
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}

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
<<<<<<< HEAD
<<<<<<< HEAD
                    if (matchRatio >= 50) // Set a threshold for acceptable similarity
=======
                    if (matchRatio >= 0.8) // Set a threshold for acceptable similarity
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
                    if (matchRatio >= 50) // Set a threshold for acceptable similarity
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
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
<<<<<<< HEAD

=======
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}

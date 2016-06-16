/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
    $.fn.JsTweentyNine = function() {
        /*----------------------------------------------------------------------------------------------*/
        /*Start Processing Area*/
        /*----------------------------------------------------------------------------------------------*/
        var _object_element = this;
        var _shuffle_card_serial_values_array = new Array();
        var _shuffle_card_serial = new Array();

        var player1 = new Player("#top-section", "Asif");
        var player2 = new Player("#left-section", "Rakib");
        var player3 = new Player("#right-section", "Masud");
        var player4 = new Player("#bottom-section", "User");
        var uitility = new Utility();
        var Msg = new Message();

        $(window).load(function() {

            Msg.Get("Game Starting");
            PreSetup();
            Start_Game();

        });
        var PreSetup = function() {
            $(_object_element).click(function() {
                //Msg.Get(player4.Player_name()+" Started"); 

            });
        }

        var Start_Game = function() {
            var shufle = new Shufle();
            _shuffle_card_serial_values_array = shufle.Shuffle_Card_Assigning_Value();
            _shuffle_card_serial = shufle.Get_Shuffle_Card();
            player1.Set_Card_Values(_shuffle_card_serial_values_array);
            player2.Set_Card_Values(_shuffle_card_serial_values_array);
            player3.Set_Card_Values(_shuffle_card_serial_values_array);
            player4.Set_Card_Values(_shuffle_card_serial_values_array);
            Card_Distribution();
        };

        var Card_Distribution = function() {
            var j = 0;
            var _contain_distribution_card_serial_array = new Array();
            for (var i = 0; i <= _shuffle_card_serial.length; i++) {

                _contain_distribution_card_serial_array[i] = "A" + i;
                if (i == 7) {
                    player1.Set_Card_Serial(uitility.Clean_Array(_contain_distribution_card_serial_array));
                    _contain_distribution_card_serial_array = [];
                } else if (i == 15) {
                    player2.Set_Card_Serial(uitility.Clean_Array(_contain_distribution_card_serial_array));
                    _contain_distribution_card_serial_array = [];
                } else if (i == 23) {
                    player3.Set_Card_Serial(uitility.Clean_Array(_contain_distribution_card_serial_array));
                    _contain_distribution_card_serial_array = [];
                } else if (i == 31) {
                    player4.Set_Card_Serial(uitility.Clean_Array(_contain_distribution_card_serial_array));
                    _contain_distribution_card_serial_array = [];
                }


            }
            Card_Generate();
        };
        var Card_Generate = function() {
            player1.Generate_Card("top");
            player2.Generate_Card("left");
            player3.Generate_Card("right");
            player4.Generate_Card("bottom");

        };

        /*----------------------------------------------------------------------------------------------*/
        /*End Processing Area*/
        /*----------------------------------------------------------------------------------------------*/
    };

})(jQuery);

/*----------------------------------------------------------------------------------------------*/
/*Start Custom Class Area */
/*----------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------*/
/*Start Player Class */
/*----------------------------------------------------------------------------------------------*/
var Player = function(obj, name) {
        var _obj_element = $(obj);
        var player_name = "<b>" + name + " : </b>";
        var _player_card_serial = new Array();
        var _serial_card_assigning_values = new Array();
        var _temp_card_serail = new Array();
        var utility = new Utility();
        var Msg = new Message();

        var On_Hand_Card_Serial = function() {
            var _on_hand_card_array = new Array();
            for (var i = 0; i < _player_card_serial.length; i++) {
                _on_hand_card_array[i] = _serial_card_assigning_values[_player_card_serial[i]];
            }
            return _on_hand_card_array;
        };
        var Obj_Height = function() {
            return Math.round(($(_obj_element).height() - 159) / 7);
        };
        var Obj_Width = function() {
            return Math.round(($(_obj_element).width() - 131) / 7);
        };
        var Set_Last_Four_Card = function(_element) {


            _player_card_serial = utility.Remove_Element_from_Array(_element, _player_card_serial);
        };
        var Bind_User_Card = function(_bindobject) {
            $("#" + _bindobject).bind({
                mouseenter: function(e) {
                    e.preventDefault();
                    $(this).css({
                        'z-index': '300',
                        'box-shadow': ' 0 0 2em #CC00FF',
                        '-webkit-box-shadow': '0 0 2em #CC00FF',
                        '-moz-box-shadow': '0 0 2em #CC00FF'
                    });
                },
                mouseleave: function(e) {
                    e.preventDefault();
                    $(this).css({
                        "z-index": "1",
                        'box-shadow': 'none',
                        '-webkit-box-shadow': 'none',
                        '-moz-box-shadow': 'none'
                    });

                },
                click: function(e) {
                    Msg.Get(player_name + " Playing &raquo;" + _serial_card_assigning_values[_bindobject]);
                    e.preventDefault();
                }

            });
        };
        var Clear_Card = function() {
            $(_obj_element).find(".card").remove();
        }


        return {

            Set_Card_Serial: function(_cardserial) {

                _temp_card_serail = _cardserial;
                _player_card_serial = _cardserial;
                $(_obj_element).click(function(e) {
                    Msg.Get(player_name + "^" + On_Hand_Card_Serial());
                    //alert(_player_card_serial);                                   
                    //alert(On_Hand_Card_Serial());
                });
            },
            Set_Card_Values: function(_serial_values_array) {
                _serial_card_assigning_values = _serial_values_array;
            },
            Generate_Card: function(_TopBottom_leftRight) {
                Msg.Get(player_name + " Get Card");
                Clear_Card();
                if (_TopBottom_leftRight == "left" || _TopBottom_leftRight == "right") {
                    for (var i = 0; i < 4; i++) {

                        $(_obj_element).append("<div class='card' id=" + _temp_card_serail[i] + "></div>");
                        $("#" + _temp_card_serail[i]).css({
                            "margin-top": Obj_Height() * i
                        });
                        $("#" + _temp_card_serail[i]).hide().delay(1000).slideDown().delay(1000);
                        //Set_Last_Four_Card(_temp_card_serail[i]);
                    }
                } else if (_TopBottom_leftRight == "top") {
                    for (var i = 0; i < 4; i++) {
                        $(_obj_element).append("<div class='card' id=" + _temp_card_serail[i] + "></div>");
                        $("#" + _temp_card_serail[i]).css({
                            "margin-left": Obj_Width() * i
                        });
                        $("#" + _temp_card_serail[i]).hide().delay(1000).slideDown().delay(1000);
                        //Set_Last_Four_Card(_temp_card_serail[i]);

                    }

                } else if (_TopBottom_leftRight == "bottom") {
                    for (var i = 0; i < 4; i++) {
                        $(_obj_element).append("<div class='card' id=" + _temp_card_serail[i] + "></div>");
                        $("#" + _temp_card_serail[i]).css({
                            "margin-left": "" + Obj_Width() * i + "px",
                            "background": "url(images/" + _serial_card_assigning_values[_player_card_serial[i]] + ".png) no-repeat",
                            "z-index": "" + i + ""
                        });
                        $("#" + _temp_card_serail[i]).hide().delay(1000).slideDown().delay(1000);
                        Bind_User_Card(_temp_card_serail[i]);
                        //Set_Last_Four_Card(_temp_card_serail[i]);

                    }

                }
            },
            Player_name: function() {
                return player_name;
            }

        };
    }
    /*----------------------------------------------------------------------------------------------*/
    /*End Player Class  */
    /*----------------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------*/
    /*Start Card Shuffle Class  */
    /*----------------------------------------------------------------------------------------------*/
var Shufle = function() {
        var Card_Serial_Array = ["C", "D", "S", "H"];
        var Total_Card_Serial_Array = new Array();
        var Msg = new Message();

        var Get_Card_Serial = function() {
            Msg.Get("Card Shuffling");
            var k = 0;
            for (var i = 0; i < Card_Serial_Array.length; i++) {
                for (var j = 6; j <= 13; j++) {
                    Total_Card_Serial_Array[k++] = (j == 6 ? 1 : j) + "-" + Card_Serial_Array[i];
                }

            }

            return Total_Card_Serial_Array;
        };
        var Get_Random_Serial_Array = function() {
            var _card_serial = Get_Card_Serial();
            for (var j, x, i = _card_serial.length; i; j = parseInt(Math.random() * i), x = _card_serial[--i], _card_serial[i] = _card_serial[j], _card_serial[j] = x);
            return _card_serial;

        };

        return {
            Shuffle_Card_Assigning_Value: function() {
                var _new_array = new Array();
                var _random_serial_array = Get_Random_Serial_Array();
                for (var i = 0; i < _random_serial_array.length; i++) {
                    var _serial_string = _random_serial_array[i];
                    _new_array['A' + i] = _serial_string;

                }
                return _new_array;
            },
            Get_Shuffle_Card: function() {
                return Get_Random_Serial_Array();
            }

        };
    }
    /*----------------------------------------------------------------------------------------------*/
    /*End Card Shuffle Class  */
    /*----------------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------*/
    /*Start Utility  Class  */
    /*----------------------------------------------------------------------------------------------*/
var Utility = function() {
        var Sort_MyWay = function(a, b) {
            return (a - b);
        };

        return {
            Clean_Array: function(_bug_array) {
                _bug_array = $.grep(_bug_array, function(n) {
                    return (n);
                });
                return _bug_array;
            },
            Remove_Element_from_Array: function(_element, _array) {
                return _array = $.grep(_array, function(val) {
                    return val != _element;
                });
            },
            Array_Sort: function(_array) {
                var S = new Array();
                var H = new Array();
                var D = new Array();
                var C = new Array();
                var _sort_array = new Array();
                var _temp_array = new Array();
                for (var i = 0; i < _array.length; i++) {
                    var splitval = _array[i].split("-");

                    if (splitval[1] == "S") {
                        S[i] = parseInt(splitval[0]);
                    } else if (splitval[1] == "H") {
                        H[i] = parseInt(splitval[0]);
                    } else if (splitval[1] == "D") {
                        D[i] = parseInt(splitval[0]);
                    } else if (splitval[1] == "C") {
                        C[i] = parseInt(splitval[0]);
                    }
                }
                S.sort(Sort_MyWay);
                H.sort(Sort_MyWay);
                D.sort(Sort_MyWay);
                C.sort(Sort_MyWay);
                alert(S[0] + ">" + H[0] + ">" + D[0] + ">" + C[0]);
                if (S[0] != undefined) {
                    for (var s = 0; s <= S.length; s++) {
                        _temp_array[s] = S[s] + "-S";
                    }
                    _sort_array = $.merge(_sort_array, _temp_array);
                }
                if (H[0] != undefined) {
                    for (var h = 0; h <= H.length; h++) {
                        _temp_array[h] = H[h] + "-H";
                    }
                    _sort_array = $.merge(_sort_array, _temp_array);
                }
                if (D[0] != undefined) {
                    for (var d = 0; d <= D.length; d++) {
                        _temp_array[d] = D[d] + "-D";
                    }
                    _sort_array = $.merge(_sort_array, _temp_array);
                }
                if (C[0] != undefined) {
                    for (var c = 0; c <= C.length; c++) {
                        _temp_array[c] = C[c] + "-C";
                    }
                    _sort_array = $.merge(_sort_array, _temp_array);
                }

                return _sort_array;
            }

        }
    }
    /*----------------------------------------------------------------------------------------------*/
    /*End Utility Class  */
    /*----------------------------------------------------------------------------------------------*/
    /*----------------------------------------------------------------------------------------------*/
    /*Start Message Class  */
    /*----------------------------------------------------------------------------------------------*/
var Message = function() {

        var MessageGenerate = function(_msg) {
            var _date = new Date();
            $("#bottom-right").append("<p><span>[ " + _date.getMinutes() + " : " + _date.getSeconds() + " ] </span>" + _msg + "...</p>");
            $("#bottom-right").scrollTop($("#bottom-right")[0].scrollHeight);

        }
        return {
            Get: function(_msg) {
                MessageGenerate(_msg);
            }
        };
    }
    /*----------------------------------------------------------------------------------------------*/
    /*End Message Class  */
    /*----------------------------------------------------------------------------------------------*/




/*----------------------------------------------------------------------------------------------*/
/*End Custom Class Area */
/*----------------------------------------------------------------------------------------------*/
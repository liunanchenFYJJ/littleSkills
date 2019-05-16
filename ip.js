(function (window, undefined) {
    /**
     * 验证ipv4和mask的合法性
     * @param {*} ipv4 
     * @param {*} mask
     * @returns true/false
     */
    function validateIpv4ByMask(ipv4 = '', mask) {
        let ipv4Arr = ipv4.split('.');
        let binaryStr = '';
        let Zero = '00000000';
        for (let i = 0; i < ipv4Arr.length; i++) {
            let element = ipv4Arr[i];
            let binary = parseInt(element, 10).toString(2); //转为二进制
            // 补足8位
            if (binary.length < 8) {
                binary = Zero.substring(0, 8 - binary.length) + binary;
            }
            binaryStr += binary;
        }
        console.log(binaryStr)
        let testLength = 32 - mask;
        // 根据掩码测试相应的位数
        let regExp = new RegExp('0{' + testLength + '}$');
        return regExp.test(binaryStr);
    }

    /**
     * ipv6地址补完整
     * @param {*} ipv6 
     * @returns 返回完整格式的ipv6
     */
    // 根据ipv6只能有一个'::'进行判断
    function formatIpv6(ipv6 = '') {
        // 取出':'个数
        let count = 0;
        for (let i = 0; i < ipv6.length; i++) {
            const element = ipv6[i];
            if (element === ':') {
                count++;
            }
        }
        if (ipv6.indexOf('::') !== -1) { // 存在
            // 补齐冒号
            let Colon = ':::::::';
            let newColon = Colon.substring(0, 7 - count + 2);
            let newIpv6 = ipv6.split('::').join(newColon);
            return newIpv6;
        } else {
            return ipv6;
        }
    }

    /**
     * 验证ipv6和mask的合法性
     * @param {*} ipv6 
     * @param {*} mask 
     * @returns true/false
     */
    function validateIpv6ByMask(ipv6 = '', mask) {
        let formatIpv6 = formatIpv6(ipv6);
        let formatIpv6Arr = formatIpv6.split(':');
        let Zero = '0000000000000000';
        let newipv6Str = '';
        for (let i = 0; i < formatIpv6Arr.length; i++) {
            let element = formatIpv6Arr[i] || 0;
            let binary = parseInt(element, 16).toString(2);
            if (binary.length < 16) {
                binary = Zero.substring(0, 16 - binary.length) + binary;
            }
            newipv6Str += binary;
        }
        let testLength = 128 - mask;
        // 正则 /\0{n}$/
        let newRegExp = new RegExp('0{' + testLength + '}$');
        return newRegExp.test(newipv6Str)
    }
})(window)
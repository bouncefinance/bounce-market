import { useEffect, useState } from 'react';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { connectorLocalStorageKey, injected } from 'constants/index';
import { isMobile } from 'web3modal';

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then(isAuthorized => {
      const hasSignedIn = window.localStorage.getItem(connectorLocalStorageKey);
      if (isAuthorized && hasSignedIn) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else if (isMobile() && window.ethereum && hasSignedIn) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(e => {
          console.error('Failed to activate after chain changed', e);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(e => {
            console.error('Failed to activate after accounts changed', e);
          });
        }
      };

      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}
